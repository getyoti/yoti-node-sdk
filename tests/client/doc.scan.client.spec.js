const fs = require('fs');
const nock = require('nock');
const uuid = require('uuid');

const config = require('../../config');

const {
  DocScanClient,
  SessionSpecificationBuilder,
} = require('../../');

const CreateSessionResult = require('../../src/doc_scan_service/session/create/create.session.result');
const GetSessionResult = require('../../src/doc_scan_service/session/retrieve/get.session.result');
const Media = require('../../src/data_type/media');

const PEM_STRING = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');
const APP_ID = uuid();
const SESSION_ID = 'some-session-id';
const MEDIA_ID = 'some-media-id';
const SESSION_CREATE_URI = new RegExp(`^/idverify/v1/sessions\\?sdkId=${APP_ID}`);
const SESSION_URI = new RegExp(`^/idverify/v1/sessions/${SESSION_ID}\\?sdkId=${APP_ID}`);
const MEDIA_URI = new RegExp(`^/idverify/v1/sessions/${SESSION_ID}/media/${MEDIA_ID}/content\\?sdkId=${APP_ID}`);

describe('DocScanClient', () => {
  let docScanClient;

  beforeEach(() => {
    docScanClient = new DocScanClient(APP_ID, PEM_STRING);
  });

  describe('#createSession', () => {
    it('should return a session response', (done) => {
      const sessionSpec = new SessionSpecificationBuilder().build();

      nock(config.yoti.docScanApi)
        .post(
          SESSION_CREATE_URI,
          JSON.stringify(sessionSpec)
        )
        .reply(200, JSON.stringify({}));

      docScanClient
        .createSession(sessionSpec)
        .then((result) => {
          expect(result).toBeInstanceOf(CreateSessionResult);
          done();
        })
        .catch(done);
    });
  });

  describe('#getSession', () => {
    it('should return a DocScan session', (done) => {
      nock(config.yoti.docScanApi)
        .get(SESSION_URI)
        .reply(200, JSON.stringify({
          session_id: 'some-session-id',
        }));

      docScanClient
        .getSession(SESSION_ID)
        .then((result) => {
          expect(result).toBeInstanceOf(GetSessionResult);
          expect(result.getSessionId()).toBe('some-session-id');
          done();
        })
        .catch(done);
    });
  });

  describe('#deleteSession', () => {
    it('should have no response', (done) => {
      nock(config.yoti.docScanApi)
        .delete(SESSION_URI)
        .reply(204);

      docScanClient
        .deleteSession(SESSION_ID)
        .then((result) => {
          expect(result).toBeUndefined();
          done();
        })
        .catch(done);
    });
  });

  describe('#getMediaContent', () => {
    it('should return media', (done) => {
      nock(config.yoti.docScanApi)
        .get(MEDIA_URI)
        .reply(200, '', {
          'Content-Type': 'image/jpeg',
        });

      docScanClient
        .getMediaContent(SESSION_ID, MEDIA_ID)
        .then((result) => {
          expect(result).toBeInstanceOf(Media);
          done();
        })
        .catch(done);
    });
  });

  describe('#deleteMediaContent', () => {
    it('should have no response', (done) => {
      nock(config.yoti.docScanApi)
        .delete(MEDIA_URI)
        .reply(204);

      docScanClient
        .deleteMediaContent(SESSION_ID, MEDIA_ID)
        .then((result) => {
          expect(result).toBeUndefined();
          done();
        })
        .catch(done);
    });
  });
});
