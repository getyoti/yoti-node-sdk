const fs = require('fs');
const nock = require('nock');
const { v4: uuid } = require('uuid');

const config = require('../../config');

const {
  SessionSpecificationBuilder,
  IDVService,
  CreateFaceCaptureResourcePayloadBuilder,
} = require('../../src/idv_service');

const CreateSessionResult = require('../../src/idv_service/session/create/create.session.result');
const GetSessionResult = require('../../src/idv_service/session/retrieve/get.session.result');
const Media = require('../../src/data_type/media');
const SupportedDocumentResponse = require('../../src/idv_service/support/supported.documents.response');
const SessionConfigurationResponse = require('../../src/idv_service/session/retrieve/configuration/session.configuration.response');
const SessionTrackedDevicesResponse = require('../../src/idv_service/session/retrieve/devices/session.tracked.devices.response');
const CaptureResponse = require('../../src/idv_service/session/retrieve/configuration/capture/capture.response');
const CreateFaceCaptureResourceResponse = require('../../src/idv_service/session/retrieve/create.face.capture.resource.response');
const { UploadFaceCaptureImagePayloadBuilder } = require('../..');

const PEM_STRING = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');
const SESSION_ID = 'some-session-id';
const RESOURCE_ID = 'some-resource-id';
const MEDIA_ID = 'some-media-id';
const APP_ID = uuid();

const SESSION_CREATE_URI = new RegExp(`^/idverify/v1/sessions\\?sdkId=${APP_ID}`);
const SESSION_URI = new RegExp(`^/idverify/v1/sessions/${SESSION_ID}\\?sdkId=${APP_ID}`);
const SESSION_CONFIG_URI = new RegExp(`^/idverify/v1/sessions/${SESSION_ID}/configuration`);
const SESSION_TRACKED_DEVICES_URI = new RegExp(`^/idverify/v1/sessions/${SESSION_ID}/tracked-devices`);
const FACE_CAPTURE_CREATE_URI = new RegExp(`^/idverify/v1/sessions/${SESSION_ID}/resources/face-capture`);
const UPLOAD_FACE_CAPTURE_IMAGE_URI = new RegExp(`^/idverify/v1/sessions/${SESSION_ID}/resources/face-capture/${RESOURCE_ID}/image`);
const MEDIA_URI = new RegExp(`^/idverify/v1/sessions/${SESSION_ID}/media/${MEDIA_ID}/content\\?sdkId=${APP_ID}`);
const SUPPORTED_DOCUMENTS_URI = new RegExp('^/idverify/v1/supported-documents');
const SOME_CODE = 'SOME_CODE';
const SOME_MESSAGE = 'SOME_MESSAGE';
const SOME_ERROR_RESPONSE = JSON.stringify({ code: SOME_CODE, message: SOME_MESSAGE });
const SOME_ERROR_MESSAGE = `${SOME_CODE} - ${SOME_MESSAGE}`;
const JSON_RESPONSE_HEADERS = { 'Content-Type': 'application/json' };

describe('IDVService', () => {
  let idvService;
  let consoleLog;

  beforeEach(() => {
    idvService = new IDVService(APP_ID, PEM_STRING);
    consoleLog = jest.spyOn(global.console, 'log');
  });

  afterEach(() => {
    consoleLog.mockRestore();
  });

  describe('#createSession', () => {
    let sessionSpec;

    beforeEach(() => {
      sessionSpec = new SessionSpecificationBuilder().build();
    });

    describe('when a valid response is returned', () => {
      it('should return a session response', (done) => {
        nock(config.yoti.idvApi)
          .post(
            SESSION_CREATE_URI,
            JSON.stringify(sessionSpec)
          )
          .reply(
            200,
            JSON.stringify({
              client_session_token_ttl: 30,
              client_session_token: 'some-token',
              session_id: 'some-id',
            })
          );

        idvService
          .createSession(sessionSpec)
          .then((result) => {
            expect(result).toBeInstanceOf(CreateSessionResult);
            expect(result.getClientSessionTokenTtl()).toBe(30);
            expect(result.getClientSessionToken()).toBe('some-token');
            expect(result.getSessionId()).toBe('some-id');
            done();
          })
          .catch(done);
      });
    });
    describe('when an invalid response code is returned', () => {
      it('should log error and reject', (done) => {
        nock(config.yoti.idvApi)
          .post(
            SESSION_CREATE_URI,
            JSON.stringify(sessionSpec)
          )
          .reply(400);

        idvService
          .createSession(sessionSpec)
          .catch((err) => {
            expect(err.message).toBe('Bad Request');
            expect(consoleLog)
              .toHaveBeenCalledWith('Error getting data from Yoti API: Bad Request');
            done();
          })
          .catch(done);
      });
    });
    describe('when an invalid response code is returned with body', () => {
      it('should log error and reject with response body', (done) => {
        nock(config.yoti.idvApi)
          .post(
            SESSION_CREATE_URI,
            JSON.stringify(sessionSpec)
          )
          .reply(400, SOME_ERROR_RESPONSE, JSON_RESPONSE_HEADERS);

        idvService
          .createSession(sessionSpec)
          .catch((err) => {
            expect(err.message).toBe(SOME_ERROR_MESSAGE);
            expect(consoleLog)
              .toHaveBeenCalledWith('Error getting data from Yoti API: Bad Request');
            done();
          })
          .catch(done);
      });
    });
    describe('when an invalid response body is returned', () => {
      it('should reject', (done) => {
        nock(config.yoti.idvApi)
          .post(
            SESSION_CREATE_URI,
            JSON.stringify(sessionSpec)
          )
          .reply(
            200,
            { client_session_token_ttl: { some: 'invalid ttl' } }
          );

        idvService
          .createSession(sessionSpec)
          .catch((err) => {
            expect(err.message).toBe('client_session_token_ttl must be an integer');
            done();
          })
          .catch(done);
      });
    });
  });

  describe('#getSession', () => {
    describe('when a valid response is returned', () => {
      it('should return a IDV session', (done) => {
        nock(config.yoti.idvApi)
          .get(SESSION_URI)
          .reply(
            200,
            JSON.stringify({ session_id: 'some-session-id' })
          );

        idvService
          .getSession(SESSION_ID)
          .then((result) => {
            expect(result).toBeInstanceOf(GetSessionResult);
            expect(result.getSessionId()).toBe('some-session-id');
            done();
          })
          .catch(done);
      });
    });
    describe('when response content is invalid', () => {
      it('should reject', (done) => {
        nock(config.yoti.idvApi)
          .get(SESSION_URI)
          .reply(200, { session_id: {} });

        idvService
          .getSession(SESSION_ID)
          .catch((err) => {
            expect(err.message).toBe('session_id must be a string');
            done();
          })
          .catch(done);
      });
    });
    describe('when response code is invalid', () => {
      it('should reject', (done) => {
        nock(config.yoti.idvApi)
          .get(SESSION_URI)
          .reply(400);

        idvService
          .getSession(SESSION_ID)
          .catch((err) => {
            expect(err.message).toBe('Bad Request');
            done();
          })
          .catch(done);
      });
    });
    describe('when response code is invalid with body', () => {
      it('should reject with response body and message', (done) => {
        nock(config.yoti.idvApi)
          .get(SESSION_URI)
          .reply(400, SOME_ERROR_RESPONSE, JSON_RESPONSE_HEADERS);

        idvService
          .getSession(SESSION_ID)
          .catch((err) => {
            expect(err.message).toBe(SOME_ERROR_MESSAGE);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('#deleteSession', () => {
    describe('when a valid response is returned', () => {
      it('should have no response', (done) => {
        nock(config.yoti.idvApi)
          .delete(SESSION_URI)
          .reply(204);

        idvService
          .deleteSession(SESSION_ID)
          .then((result) => {
            expect(result).toBeUndefined();
            done();
          })
          .catch(done);
      });
    });
    describe('when response code is invalid', () => {
      it('should reject', (done) => {
        nock(config.yoti.idvApi)
          .delete(SESSION_URI)
          .reply(400);

        idvService
          .deleteSession(SESSION_ID)
          .catch((err) => {
            expect(err.message).toBe('Bad Request');
            done();
          })
          .catch(done);
      });
    });
    describe('when response code is invalid with body', () => {
      it('should reject with response message and body', (done) => {
        nock(config.yoti.idvApi)
          .delete(SESSION_URI)
          .reply(400, SOME_ERROR_RESPONSE, JSON_RESPONSE_HEADERS);

        idvService
          .deleteSession(SESSION_ID)
          .catch((err) => {
            expect(err.message).toBe(SOME_ERROR_MESSAGE);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('#getMediaContent', () => {
    describe('when a valid response is returned', () => {
      test.each([
        ['image/jpeg'],
        ['image/png'],
        ['image/other'],
        ['image/jpeg; charset=UTF-8'],
        ['image/png; charset=UTF-8'],
      ])('"%s" content type should return correct media type', (contentType, done) => {
        nock(config.yoti.idvApi)
          .get(MEDIA_URI)
          .reply(200, '', {
            'Content-Type': contentType,
          });

        idvService
          .getMediaContent(SESSION_ID, MEDIA_ID)
          .then((result) => {
            expect(result).toBeInstanceOf(Media);
            done();
          })
          .catch(done);
      });

      test.each([
        ['content-type'],
        ['Content-Type'],
      ])('%s header should be case-insensitive', (contentType, done) => {
        nock(config.yoti.idvApi)
          .get(MEDIA_URI)
          .reply(200, '', {
            [contentType]: 'image/png',
          });

        idvService
          .getMediaContent(SESSION_ID, MEDIA_ID)
          .then((result) => {
            expect(result).toBeInstanceOf(Media);
            done();
          })
          .catch(done);
      });
    });

    describe('when response has no content', () => {
      it('should return null', (done) => {
        nock(config.yoti.idvApi)
          .get(MEDIA_URI)
          .reply(204, '');

        idvService
          .getMediaContent(SESSION_ID, MEDIA_ID)
          .then((result) => {
            expect(result).toBe(null);
            done();
          })
          .catch(done);
      });
    });
    describe('when response is invalid', () => {
      it('should reject', (done) => {
        nock(config.yoti.idvApi)
          .get(MEDIA_URI)
          .reply(400);

        idvService
          .getMediaContent(SESSION_ID, MEDIA_ID)
          .catch((err) => {
            expect(err.message).toBe('Bad Request');
            done();
          })
          .catch(done);
      });
    });
    describe('when response code is invalid with response body', () => {
      it('should reject with response message and body', (done) => {
        nock(config.yoti.idvApi)
          .get(MEDIA_URI)
          .reply(400, SOME_ERROR_RESPONSE, JSON_RESPONSE_HEADERS);

        idvService
          .getMediaContent(SESSION_ID, MEDIA_ID)
          .catch((err) => {
            expect(err.message).toBe(SOME_ERROR_MESSAGE);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('#deleteMediaContent', () => {
    describe('when a valid response is returned', () => {
      it('should have no response', (done) => {
        nock(config.yoti.idvApi)
          .delete(MEDIA_URI)
          .reply(204);

        idvService
          .deleteMediaContent(SESSION_ID, MEDIA_ID)
          .then((result) => {
            expect(result).toBeUndefined();
            done();
          })
          .catch(done);
      });
    });
    describe('when response code is invalid', () => {
      it('should reject', (done) => {
        nock(config.yoti.idvApi)
          .delete(MEDIA_URI)
          .reply(400);

        idvService
          .deleteMediaContent(SESSION_ID, MEDIA_ID)
          .catch((err) => {
            expect(err.message).toBe('Bad Request');
            done();
          })
          .catch(done);
      });
    });
    describe('when response code is invalid with response body', () => {
      it('should reject with response message and body', (done) => {
        nock(config.yoti.idvApi)
          .delete(MEDIA_URI)
          .reply(400, SOME_ERROR_RESPONSE, JSON_RESPONSE_HEADERS);

        idvService
          .deleteMediaContent(SESSION_ID, MEDIA_ID)
          .catch((err) => {
            expect(err.message).toBe(SOME_ERROR_MESSAGE);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('#getSupportedDocuments', () => {
    describe('when a valid response is returned', () => {
      it('should return SupportedDocumentResponse', (done) => {
        nock(config.yoti.idvApi)
          .get(SUPPORTED_DOCUMENTS_URI)
          .reply(200, '{}');

        idvService
          .getSupportedDocuments()
          .then((result) => {
            expect(result).toBeInstanceOf(SupportedDocumentResponse);
            done();
          })
          .catch(done);
      });
    });
    describe('when includeNonLatin is passed', () => {
      it('should return SupportedDocumentResponse', (done) => {
        nock(config.yoti.idvApi)
          .get(SUPPORTED_DOCUMENTS_URI)
          .query((queryParams) => queryParams.includeNonLatin === 'true')
          .reply(200, '{}');

        idvService
          .getSupportedDocuments(true)
          .then((result) => {
            expect(result).toBeInstanceOf(SupportedDocumentResponse);
            done();
          })
          .catch(done);
      });
    });
    describe('when response code is invalid', () => {
      it('should reject', (done) => {
        nock(config.yoti.idvApi)
          .get(SUPPORTED_DOCUMENTS_URI)
          .reply(400);

        idvService
          .getSupportedDocuments()
          .catch((err) => {
            expect(err.message).toBe('Bad Request');
            done();
          })
          .catch(done);
      });
    });
    describe('when response code is invalid with response body', () => {
      it('should reject with response message and body', (done) => {
        nock(config.yoti.idvApi)
          .get(SUPPORTED_DOCUMENTS_URI)
          .reply(400, SOME_ERROR_RESPONSE, JSON_RESPONSE_HEADERS);

        idvService
          .getSupportedDocuments()
          .catch((err) => {
            expect(err.message).toBe(SOME_ERROR_MESSAGE);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('#getSessionConfiguration', () => {
    describe('when a valid response is returned', () => {
      it('should return a session configuration', (done) => {
        nock(config.yoti.idvApi)
          .get(SESSION_CONFIG_URI)
          .reply(
            200,
            JSON.stringify({
              session_id: SESSION_ID,
              client_session_token_ttl: 123,
              requested_checks: [],
              capture: {
                biometric_consent: '',
              },
            })
          );

        idvService
          .getSessionConfiguration(SESSION_ID)
          .then((result) => {
            expect(result).toBeInstanceOf(SessionConfigurationResponse);
            expect(result.getSessionId()).toBe(SESSION_ID);
            expect(result.getClientSessionTokenTtl()).toBe(123);
            expect(result.getRequestedChecks()).toEqual([]);
            expect(result.getCapture()).toBeInstanceOf(CaptureResponse);
            done();
          })
          .catch(done);
      });
    });
    describe('when response content is invalid', () => {
      it('should reject', (done) => {
        nock(config.yoti.idvApi)
          .get(SESSION_CONFIG_URI)
          .reply(200, { client_session_token_ttl: {} });

        idvService
          .getSessionConfiguration(SESSION_ID)
          .catch((err) => {
            expect(err.message).toBe('client_session_token_ttl must be a number');
            done();
          })
          .catch(done);
      });
    });
    describe('when response code is invalid', () => {
      it('should reject', (done) => {
        nock(config.yoti.idvApi).get(SESSION_CONFIG_URI).reply(400);

        idvService
          .getSessionConfiguration(SESSION_ID)
          .catch((err) => {
            expect(err.message).toBe('Bad Request');
            done();
          })
          .catch(done);
      });
    });
    describe('when response code is invalid with body', () => {
      it('should reject with response body and message', (done) => {
        nock(config.yoti.idvApi)
          .get(SESSION_CONFIG_URI)
          .reply(400, SOME_ERROR_RESPONSE, JSON_RESPONSE_HEADERS);

        idvService
          .getSessionConfiguration(SESSION_ID)
          .catch((err) => {
            expect(err.message).toBe(SOME_ERROR_MESSAGE);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('#getSessionTrackedDevices', () => {
    describe('when a valid response is returned', () => {
      it('should return a session tracked devices response', (done) => {
        nock(config.yoti.idvApi)
          .get(SESSION_TRACKED_DEVICES_URI)
          .reply(
            200,
            JSON.stringify([
              {
                event: 'CONFIG_FIRST_LOADED',
                created: '2021-06-11T11:39:24Z',
                device: {
                  ip_address: '123.123.123.123',
                  ip_iso_country_code: 'GBR',
                  manufacture_name: 'Apple',
                  model_name: 'IphoneX',
                  os_name: 'MacOs',
                  os_version: '10.13.14',
                  browser_name: 'Chrome',
                  browser_version: '72.0.3626.119',
                  locale: 'en-GB',
                  client_version: '2.12.0',
                },
              },
              {
                event: 'RESOURCE_CREATED',
                resource_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                created: '2021-06-11T11:39:24Z',
                device: {
                  ip_address: '123.123.123.123',
                  ip_iso_country_code: 'GBR',
                  manufacture_name: 'Apple',
                  model_name: 'IphoneX',
                  os_name: 'MacOs',
                  os_version: '10.13.14',
                  browser_name: 'Chrome',
                  browser_version: '72.0.3626.119',
                  locale: 'en-GB',
                  client_version: '2.12.0',
                },
              },
              {
                event: 'CLIENT_SESSION_TOKEN_DELETED',
                created: '2021-06-11T11:39:24Z',
                device: {
                  ip_address: '123.123.123.123',
                  ip_iso_country_code: 'GBR',
                  manufacture_name: 'Apple',
                  model_name: 'IphoneX',
                  os_name: 'MacOs',
                  os_version: '10.13.14',
                  browser_name: 'Chrome',
                  browser_version: '72.0.3626.119',
                  locale: 'en-GB',
                  client_version: '2.12.0',
                },
              },
            ])
          );

        idvService
          .getSessionTrackedDevices(SESSION_ID)
          .then((result) => {
            expect(result).toBeInstanceOf(SessionTrackedDevicesResponse);
            expect(result.getDeviceEvents()).toHaveLength(3);
            done();
          })
          .catch(done);
      });
    });
    describe('when response content is invalid', () => {
      it('should reject', (done) => {
        nock(config.yoti.idvApi)
          .get(SESSION_TRACKED_DEVICES_URI)
          .reply(200, { rubbish: 'garbage' });

        idvService
          .getSessionTrackedDevices(SESSION_ID)
          .catch((err) => {
            expect(err.message).toBe('tracked devices must be an array');
            done();
          })
          .catch(done);
      });
    });
    describe('when response code is invalid', () => {
      it('should reject', (done) => {
        nock(config.yoti.idvApi).get(SESSION_TRACKED_DEVICES_URI).reply(400);

        idvService
          .getSessionTrackedDevices(SESSION_ID)
          .catch((err) => {
            expect(err.message).toBe('Bad Request');
            done();
          })
          .catch(done);
      });
    });
    describe('when response code is invalid with body', () => {
      it('should reject with response body and message', (done) => {
        nock(config.yoti.idvApi)
          .get(SESSION_TRACKED_DEVICES_URI)
          .reply(400, SOME_ERROR_RESPONSE, JSON_RESPONSE_HEADERS);

        idvService
          .getSessionTrackedDevices(SESSION_ID)
          .catch((err) => {
            expect(err.message).toBe(SOME_ERROR_MESSAGE);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('#deleteSessionTrackedDevices', () => {
    describe('when a valid response is returned', () => {
      it('should have no response', (done) => {
        nock(config.yoti.idvApi)
          .delete(SESSION_TRACKED_DEVICES_URI)
          .reply(204);

        idvService
          .deleteSessionTrackedDevices(SESSION_ID)
          .then((result) => {
            expect(result).toBeUndefined();
            done();
          })
          .catch(done);
      });
    });
    describe('when response code is invalid', () => {
      it('should reject', (done) => {
        nock(config.yoti.idvApi)
          .delete(SESSION_TRACKED_DEVICES_URI)
          .reply(400);

        idvService
          .deleteSessionTrackedDevices(SESSION_ID)
          .catch((err) => {
            expect(err.message).toBe('Bad Request');
            done();
          })
          .catch(done);
      });
    });
    describe('when response code is invalid with response body', () => {
      it('should reject with response message and body', (done) => {
        nock(config.yoti.idvApi)
          .delete(SESSION_TRACKED_DEVICES_URI)
          .reply(400, SOME_ERROR_RESPONSE, JSON_RESPONSE_HEADERS);

        idvService
          .deleteSessionTrackedDevices(SESSION_ID)
          .catch((err) => {
            expect(err.message).toBe(SOME_ERROR_MESSAGE);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('#createFaceCaptureResource', () => {
    let createFaceCaptureResourcePayload;

    beforeEach(() => {
      createFaceCaptureResourcePayload = new CreateFaceCaptureResourcePayloadBuilder().withRequirementId('abc').build();
    });

    describe('when a valid response is returned', () => {
      it('should return a session response', (done) => {
        nock(config.yoti.idvApi)
          .post(
            FACE_CAPTURE_CREATE_URI,
            JSON.stringify(createFaceCaptureResourcePayload)
          )
          .reply(
            200,
            JSON.stringify({
              id: '123',
              frames: 2,
            })
          );

        idvService
          .createFaceCaptureResource(SESSION_ID, createFaceCaptureResourcePayload)
          .then((result) => {
            expect(result).toBeInstanceOf(CreateFaceCaptureResourceResponse);
            expect(result.getId()).toBe('123');
            expect(result.getFrames()).toBe(2);
            done();
          })
          .catch(done);
      });
    });
    describe('when an invalid response code is returned', () => {
      it('should log error and reject', (done) => {
        nock(config.yoti.idvApi)
          .post(
            FACE_CAPTURE_CREATE_URI,
            JSON.stringify(createFaceCaptureResourcePayload)
          )
          .reply(400);

        idvService
          .createFaceCaptureResource(SESSION_ID, createFaceCaptureResourcePayload)
          .catch((err) => {
            expect(err.message).toBe('Bad Request');
            expect(consoleLog)
              .toHaveBeenCalledWith('Error getting data from Yoti API: Bad Request');
            done();
          })
          .catch(done);
      });
    });
    describe('when an invalid response code is returned with body', () => {
      it('should log error and reject with response body', (done) => {
        nock(config.yoti.idvApi)
          .post(
            FACE_CAPTURE_CREATE_URI,
            JSON.stringify(createFaceCaptureResourcePayload)
          )
          .reply(400, SOME_ERROR_RESPONSE, JSON_RESPONSE_HEADERS);

        idvService
          .createFaceCaptureResource(SESSION_ID, createFaceCaptureResourcePayload)
          .catch((err) => {
            expect(err.message).toBe(SOME_ERROR_MESSAGE);
            expect(consoleLog)
              .toHaveBeenCalledWith('Error getting data from Yoti API: Bad Request');
            done();
          })
          .catch(done);
      });
    });
    describe('when an invalid response body is returned', () => {
      it('should reject', (done) => {
        nock(config.yoti.idvApi)
          .post(
            FACE_CAPTURE_CREATE_URI,
            JSON.stringify(createFaceCaptureResourcePayload)
          )
          .reply(
            200,
            { id: { some: 'invalid ttl' } }
          );

        idvService
          .createFaceCaptureResource(SESSION_ID, createFaceCaptureResourcePayload)
          .catch((err) => {
            expect(err.message).toBe('resourceData.id must be a string');
            done();
          })
          .catch(done);
      });
    });
  });

  describe('#uploadFaceCaptureImage', () => {
    let uploadFaceCaptureImagePayload;

    beforeEach(() => {
      uploadFaceCaptureImagePayload = new UploadFaceCaptureImagePayloadBuilder().forPngImage().withImageContents(Buffer.from('abc')).build();
    });

    describe('when a valid response is returned', () => {
      it('should return a session response', (done) => {
        nock(config.yoti.idvApi)
          .put(
            UPLOAD_FACE_CAPTURE_IMAGE_URI
          )
          .reply(
            200
          );

        idvService
          .uploadFaceCaptureImage(SESSION_ID, RESOURCE_ID, uploadFaceCaptureImagePayload)
          .then((result) => {
            expect(result).toBeDefined();
            done();
          })
          .catch(done);
      });
    });
    describe('when an invalid response code is returned', () => {
      it('should log error and reject', (done) => {
        nock(config.yoti.idvApi)
          .put(
            UPLOAD_FACE_CAPTURE_IMAGE_URI
          )
          .reply(400);

        idvService
          .uploadFaceCaptureImage(SESSION_ID, RESOURCE_ID, uploadFaceCaptureImagePayload)
          .catch((err) => {
            expect(err.message).toBe('Bad Request');
            expect(consoleLog)
              .toHaveBeenCalledWith('Error getting data from Yoti API: Bad Request');
            done();
          })
          .catch(done);
      });
    });
    describe('when an invalid response code is returned with body', () => {
      it('should log error and reject with response body', (done) => {
        nock(config.yoti.idvApi)
          .put(
            UPLOAD_FACE_CAPTURE_IMAGE_URI
          )
          .reply(400, SOME_ERROR_RESPONSE, JSON_RESPONSE_HEADERS);

        idvService
          .uploadFaceCaptureImage(SESSION_ID, RESOURCE_ID, uploadFaceCaptureImagePayload)
          .catch((err) => {
            expect(err.message).toBe(SOME_ERROR_MESSAGE);
            expect(consoleLog)
              .toHaveBeenCalledWith('Error getting data from Yoti API: Bad Request');
            done();
          })
          .catch(done);
      });
    });
  });
});
