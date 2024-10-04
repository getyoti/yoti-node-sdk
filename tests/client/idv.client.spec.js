const fs = require('fs');
const nock = require('nock');
const { v4: uuid } = require('uuid');

const config = require('../../config');

const {
  IDVClient,
  SessionSpecificationBuilder,
  CreateFaceCaptureResourcePayloadBuilder,
  UploadFaceCaptureImagePayloadBuilder,
} = require('../..');

const { IDVService } = require('../../src/idv_service');
const CreateSessionResult = require('../../src/idv_service/session/create/create.session.result');
const GetSessionResult = require('../../src/idv_service/session/retrieve/get.session.result');
const Media = require('../../src/data_type/media');
const SupportedDocumentResponse = require('../../src/idv_service/support/supported.documents.response');
const SessionConfigurationResponse = require('../../src/idv_service/session/retrieve/configuration/session.configuration.response');
const SessionTrackedDevicesResponse = require('../../src/idv_service/session/retrieve/devices/session.tracked.devices.response');
const CaptureResponse = require('../../src/idv_service/session/retrieve/configuration/capture/capture.response');
const CreateFaceCaptureResourceResponse = require('../../src/idv_service/session/retrieve/create.face.capture.resource.response');

const GENERIC_API_PATH = '/idverify/v1';

const PEM_STRING = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');
const APP_ID = uuid();
const SESSION_ID = 'some-session-id';
const RESOURCE_ID = 'some-resource-id';
const MEDIA_ID = 'some-media-id';

describe.each([
  [
    'default',
    {
      apiUrlDomain: config.yoti.idvApi.replace(GENERIC_API_PATH, ''),
      apiUrlPath: GENERIC_API_PATH,
      useDefaultApiUrl: true,
    },
  ],
  [
    'custom options.apiUrl',
    {
      apiUrlDomain: 'https://some.api.com',
      apiUrlPath: GENERIC_API_PATH,
      useDefaultApiUrl: false,
    },
  ],
])('IDVClient (%s)', (description, { apiUrlDomain, apiUrlPath, useDefaultApiUrl }) => {
  const createSessionUriRegExp = new RegExp(`${apiUrlPath}/sessions\\?sdkId=${APP_ID}`);
  const sessionUriRegExp = new RegExp(`${apiUrlPath}/sessions/${SESSION_ID}\\?sdkId=${APP_ID}`);
  const sessionMediaUriRegExp = new RegExp(`${apiUrlPath}/sessions/${SESSION_ID}/media/${MEDIA_ID}/content\\?sdkId=${APP_ID}`);
  const supportedDocumentsUriRegExp = new RegExp(`${apiUrlPath}/supported-documents`);
  const sessionConfigUriRegExp = new RegExp(`/sessions/${SESSION_ID}/configuration`);
  const sessionTrackedDevicesUriRegExp = new RegExp(`/sessions/${SESSION_ID}/tracked-devices`);
  const faceCaptureCreateUri = new RegExp(`^/idverify/v1/sessions/${SESSION_ID}/resources/face-capture`);
  const uploadFaceCaptureImageUri = new RegExp(`^/idverify/v1/sessions/${SESSION_ID}/resources/face-capture/${RESOURCE_ID}/image`);

  let idvClient;

  beforeEach(() => {
    if (useDefaultApiUrl) {
      idvClient = new IDVClient(APP_ID, PEM_STRING);
    } else {
      idvClient = new IDVClient(APP_ID, PEM_STRING, { apiUrl: apiUrlDomain + apiUrlPath });
    }
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('#createSession', () => {
    const sessionSpec = new SessionSpecificationBuilder().build();

    const setupResponse = (responseBody, responseStatusCode = 200) => {
      nock(apiUrlDomain)
        .post(createSessionUriRegExp, JSON.stringify(sessionSpec))
        .reply(responseStatusCode, responseBody);
    };

    beforeEach(() => {
      setupResponse(JSON.stringify({}));
    });

    it('should return a session response', (done) => {
      idvClient
        .createSession(sessionSpec)
        .then((result) => {
          expect(result).toBeInstanceOf(CreateSessionResult);
          done();
        })
        .catch(done);
    });
  });

  describe('#getSession', () => {
    const setupResponse = (responseBody, responseStatusCode = 200) => {
      nock(apiUrlDomain)
        .get(sessionUriRegExp)
        .reply(responseStatusCode, responseBody);
    };

    beforeEach(() => {
      setupResponse(JSON.stringify({
        session_id: SESSION_ID,
      }));
    });

    it('should return a IDV session', (done) => {
      idvClient
        .getSession(SESSION_ID)
        .then((result) => {
          expect(result).toBeInstanceOf(GetSessionResult);
          expect(result.getSessionId()).toBe(SESSION_ID);
          done();
        })
        .catch(done);
    });
  });

  describe('#deleteSession', () => {
    const setupResponse = (responseStatusCode = 204) => {
      nock(apiUrlDomain)
        .delete(sessionUriRegExp)
        .reply(responseStatusCode);
    };

    beforeEach(() => {
      setupResponse();
    });

    it('should have no response', (done) => {
      idvClient
        .deleteSession(SESSION_ID)
        .then((result) => {
          expect(result).toBeUndefined();
          done();
        })
        .catch(done);
    });
  });

  describe('#getMediaContent', () => {
    const setupResponse = () => {
      nock(apiUrlDomain)
        .get(sessionMediaUriRegExp)
        .reply(200, '', {
          'Content-Type': 'image/jpeg',
        });
    };

    beforeEach(() => {
      setupResponse();
    });

    it('should return media', (done) => {
      idvClient
        .getMediaContent(SESSION_ID, MEDIA_ID)
        .then((result) => {
          expect(result).toBeInstanceOf(Media);
          done();
        })
        .catch(done);
    });
  });

  describe('#deleteMediaContent', () => {
    const setupResponse = (responseStatusCode = 204) => {
      nock(apiUrlDomain)
        .delete(sessionMediaUriRegExp)
        .reply(responseStatusCode);
    };

    beforeEach(() => {
      setupResponse();
    });

    it('should have no response', (done) => {
      idvClient
        .deleteMediaContent(SESSION_ID, MEDIA_ID)
        .then((result) => {
          expect(result).toBeUndefined();
          done();
        })
        .catch(done);
    });
  });

  describe('#getSupportedDocuments', () => {
    const setupResponse = (responseBody, responseStatusCode = 200) => {
      nock(apiUrlDomain)
        .get(supportedDocumentsUriRegExp)
        .reply(responseStatusCode, responseBody);
    };

    let spyOnIDVServiceRelatedMethod;

    beforeEach(() => {
      setupResponse(JSON.stringify({}));
      spyOnIDVServiceRelatedMethod = jest.spyOn(IDVService.prototype, 'getSupportedDocuments');
    });

    afterEach(() => {
      spyOnIDVServiceRelatedMethod.mockRestore();
    });

    describe('when a valid response is returned', () => {
      it('should return SupportedDocumentResponse', (done) => {
        idvClient
          .getSupportedDocuments()
          .then((result) => {
            expect(result).toBeInstanceOf(SupportedDocumentResponse);
            done();
          })
          .catch(done);
        expect(spyOnIDVServiceRelatedMethod).toHaveBeenCalledTimes(1);
        expect(spyOnIDVServiceRelatedMethod).not.toHaveBeenCalledWith(true);
      });
    });

    describe('when includeNonLatin is passed', () => {
      it('should return SupportedDocumentResponse', (done) => {
        idvClient
          .getSupportedDocuments(true)
          .then((result) => {
            expect(result).toBeInstanceOf(SupportedDocumentResponse);
            done();
          })
          .catch(done);
        expect(spyOnIDVServiceRelatedMethod).toHaveBeenCalledTimes(1);
        expect(spyOnIDVServiceRelatedMethod).toHaveBeenCalledWith(true);
      });
    });
  });

  describe('#getSessionConfiguration', () => {
    const setupResponse = (responseBody, responseStatusCode = 200) => {
      nock(apiUrlDomain)
        .get(sessionConfigUriRegExp)
        .reply(responseStatusCode, responseBody);
    };

    beforeEach(() => {
      setupResponse(JSON.stringify({
        session_id: SESSION_ID,
        client_session_token_ttl: 123,
        requested_checks: [],
        capture: {
          biometric_consent: '',
        },
      }));
    });

    it('should return an IDV session configuration', (done) => {
      idvClient
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

  describe('#getSessionTrackedDevices', () => {
    const setupResponse = (responseBody, responseStatusCode = 200) => {
      nock(apiUrlDomain)
        .get(sessionTrackedDevicesUriRegExp)
        .reply(responseStatusCode, responseBody);
    };

    beforeEach(() => {
      setupResponse(JSON.stringify([
        {
          event: 'CONFIG_FIRST_LOADED',
          created: '2021-06-11T11:39:24Z',
          device: {
            client_version: '2.12.0',
          },
        },
        {
          event: 'RESOURCE_CREATED',
          resource_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          created: '2021-06-11T11:39:24Z',
          device: {
            client_version: '2.12.0',
          },
        },
        {
          event: 'CLIENT_SESSION_TOKEN_DELETED',
          created: '2021-06-11T11:39:24Z',
          device: {
            client_version: '2.12.0',
          },
        },
      ]));
    });

    it('should return an IDV session tracked devices', (done) => {
      idvClient
        .getSessionTrackedDevices(SESSION_ID)
        .then((result) => {
          expect(result).toBeInstanceOf(SessionTrackedDevicesResponse);
          expect(result.getDeviceEvents()).toHaveLength(3);
          done();
        })
        .catch(done);
    });
  });

  describe('#deleteSessionTrackedDevices', () => {
    const setupResponse = (responseStatusCode = 204) => {
      nock(apiUrlDomain)
        .delete(sessionTrackedDevicesUriRegExp)
        .reply(responseStatusCode);
    };

    beforeEach(() => {
      setupResponse();
    });

    it('should have no response', (done) => {
      idvClient
        .deleteSessionTrackedDevices(SESSION_ID, MEDIA_ID)
        .then((result) => {
          expect(result).toBeUndefined();
          done();
        })
        .catch(done);
    });
  });

  describe('#createFaceCaptureResource', () => {
    const createFaceCaptureResourcePayload = new CreateFaceCaptureResourcePayloadBuilder().withRequirementId('abc').build();

    const setupResponse = (responseBody, responseStatusCode = 200) => {
      nock(apiUrlDomain)
        .post(faceCaptureCreateUri, JSON.stringify(createFaceCaptureResourcePayload))
        .reply(responseStatusCode, responseBody);
    };

    beforeEach(() => {
      setupResponse(JSON.stringify({ id: 'abc', frames: 5 }));
    });

    it('should return a create face capture resource response', (done) => {
      idvClient
        .createFaceCaptureResource(SESSION_ID, createFaceCaptureResourcePayload)
        .then((result) => {
          expect(result).toBeInstanceOf(CreateFaceCaptureResourceResponse);
          done();
        })
        .catch(done);
    });
  });

  describe('#uploadFaceCaptureImage', () => {
    const uploadFaceCaptureImagePayload = new UploadFaceCaptureImagePayloadBuilder().forPngImage().withImageContents(Buffer.from('abc')).build();

    const setupResponse = (responseBody, responseStatusCode = 200) => {
      nock(apiUrlDomain)
        .put(uploadFaceCaptureImageUri)
        .reply(responseStatusCode, responseBody);
    };

    beforeEach(() => {
      setupResponse();
    });

    it('should succeed uploading the image', (done) => {
      idvClient
        .uploadFaceCaptureImage(SESSION_ID, RESOURCE_ID, uploadFaceCaptureImagePayload)
        .then((result) => {
          expect(result).toBeDefined();
          done();
        })
        .catch(done);
    });
  });
});
