const fs = require('fs');
const nock = require('nock');
const { v4: uuid } = require('uuid');

const config = require('../../config');

const {
  SessionSpecificationBuilder,
  DocScanService,
} = require('../../src/doc_scan_service');

const CreateSessionResult = require('../../src/doc_scan_service/session/create/create.session.result');
const GetSessionResult = require('../../src/doc_scan_service/session/retrieve/get.session.result');
const Media = require('../../src/data_type/media');
const SupportedDocumentResponse = require('../../src/doc_scan_service/support/supported.documents.response');

const PEM_STRING = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');
const SESSION_ID = 'some-session-id';
const MEDIA_ID = 'some-media-id';
const APP_ID = uuid();

const SESSION_CREATE_URI = new RegExp(`^/idverify/v1/sessions\\?sdkId=${APP_ID}`);
const SESSION_URI = new RegExp(`^/idverify/v1/sessions/${SESSION_ID}\\?sdkId=${APP_ID}`);
const MEDIA_URI = new RegExp(`^/idverify/v1/sessions/${SESSION_ID}/media/${MEDIA_ID}/content\\?sdkId=${APP_ID}`);
const SUPPORTED_DOCUMENTS_URI = new RegExp('^/idverify/v1/supported-documents');
const SOME_CODE = 'SOME_CODE';
const SOME_MESSAGE = 'SOME_MESSAGE';
const SOME_ERROR_RESPONSE = JSON.stringify({ code: SOME_CODE, message: SOME_MESSAGE });
const SOME_ERROR_MESSAGE = `${SOME_CODE} - ${SOME_MESSAGE}`;
const JSON_RESPONSE_HEADERS = { 'Content-Type': 'application/json' };

describe('DocScanService', () => {
  let docScanService;
  let consoleLog;

  beforeEach(() => {
    docScanService = new DocScanService(APP_ID, PEM_STRING);
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
        nock(config.yoti.docScanApi)
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

        docScanService
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
        nock(config.yoti.docScanApi)
          .post(
            SESSION_CREATE_URI,
            JSON.stringify(sessionSpec)
          )
          .reply(400);

        docScanService
          .createSession(sessionSpec)
          .catch((err) => {
            expect(err.message).toBe('Bad Request');
            expect(consoleLog)
              .toHaveBeenCalledWith('Error getting data from Connect API: Bad Request');
            done();
          })
          .catch(done);
      });
    });
    describe('when an invalid response code is returned with body', () => {
      it('should log error and reject with response body', (done) => {
        nock(config.yoti.docScanApi)
          .post(
            SESSION_CREATE_URI,
            JSON.stringify(sessionSpec)
          )
          .reply(400, SOME_ERROR_RESPONSE, JSON_RESPONSE_HEADERS);

        docScanService
          .createSession(sessionSpec)
          .catch((err) => {
            expect(err.message).toBe(SOME_ERROR_MESSAGE);
            expect(consoleLog)
              .toHaveBeenCalledWith('Error getting data from Connect API: Bad Request');
            done();
          })
          .catch(done);
      });
    });
    describe('when an invalid response body is returned', () => {
      it('should reject', (done) => {
        nock(config.yoti.docScanApi)
          .post(
            SESSION_CREATE_URI,
            JSON.stringify(sessionSpec)
          )
          .reply(
            200,
            { client_session_token_ttl: { some: 'invalid ttl' } }
          );

        docScanService
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
      it('should return a DocScan session', (done) => {
        nock(config.yoti.docScanApi)
          .get(SESSION_URI)
          .reply(
            200,
            JSON.stringify({ session_id: 'some-session-id' })
          );

        docScanService
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
        nock(config.yoti.docScanApi)
          .get(SESSION_URI)
          .reply(200, { session_id: {} });

        docScanService
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
        nock(config.yoti.docScanApi)
          .get(SESSION_URI)
          .reply(400);

        docScanService
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
        nock(config.yoti.docScanApi)
          .get(SESSION_URI)
          .reply(400, SOME_ERROR_RESPONSE, JSON_RESPONSE_HEADERS);

        docScanService
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
        nock(config.yoti.docScanApi)
          .delete(SESSION_URI)
          .reply(204);

        docScanService
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
        nock(config.yoti.docScanApi)
          .delete(SESSION_URI)
          .reply(400);

        docScanService
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
        nock(config.yoti.docScanApi)
          .delete(SESSION_URI)
          .reply(400, SOME_ERROR_RESPONSE, JSON_RESPONSE_HEADERS);

        docScanService
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
        nock(config.yoti.docScanApi)
          .get(MEDIA_URI)
          .reply(200, '', {
            'Content-Type': contentType,
          });

        docScanService
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
        nock(config.yoti.docScanApi)
          .get(MEDIA_URI)
          .reply(200, '', {
            [contentType]: 'image/png',
          });

        docScanService
          .getMediaContent(SESSION_ID, MEDIA_ID)
          .then((result) => {
            expect(result).toBeInstanceOf(Media);
            done();
          })
          .catch(done);
      });
    });

    describe('when response has no content', () => {
      it('should return empty media', (done) => {
        nock(config.yoti.docScanApi)
          .get(MEDIA_URI)
          .reply(204, '');

        docScanService
          .getMediaContent(SESSION_ID, MEDIA_ID)
          .then((result) => {
            expect(result).toBeInstanceOf(Media);
            expect(result.getContent().buffer).toHaveLength(0);
            expect(result.getMimeType()).toBe('');
            done();
          })
          .catch(done);
      });
    });
    describe('when response is invalid', () => {
      it('should reject', (done) => {
        nock(config.yoti.docScanApi)
          .get(MEDIA_URI)
          .reply(400);

        docScanService
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
        nock(config.yoti.docScanApi)
          .get(MEDIA_URI)
          .reply(400, SOME_ERROR_RESPONSE, JSON_RESPONSE_HEADERS);

        docScanService
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
        nock(config.yoti.docScanApi)
          .delete(MEDIA_URI)
          .reply(204);

        docScanService
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
        nock(config.yoti.docScanApi)
          .delete(MEDIA_URI)
          .reply(400);

        docScanService
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
        nock(config.yoti.docScanApi)
          .delete(MEDIA_URI)
          .reply(400, SOME_ERROR_RESPONSE, JSON_RESPONSE_HEADERS);

        docScanService
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
        nock(config.yoti.docScanApi)
          .get(SUPPORTED_DOCUMENTS_URI)
          .reply(200, '{}');

        docScanService
          .getSupportedDocuments()
          .then((result) => {
            expect(result).toBeInstanceOf(SupportedDocumentResponse);
            done();
          })
          .catch(done);
      });
    });
    describe('when response code is invalid', () => {
      it('should reject', (done) => {
        nock(config.yoti.docScanApi)
          .get(SUPPORTED_DOCUMENTS_URI)
          .reply(400);

        docScanService
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
        nock(config.yoti.docScanApi)
          .get(SUPPORTED_DOCUMENTS_URI)
          .reply(400, SOME_ERROR_RESPONSE, JSON_RESPONSE_HEADERS);

        docScanService
          .getSupportedDocuments()
          .catch((err) => {
            expect(err.message).toBe(SOME_ERROR_MESSAGE);
            done();
          })
          .catch(done);
      });
    });
  });
});
