const fs = require('fs');
const nock = require('nock');
const { v4: uuid } = require('uuid');

const config = require('../../config');

const {
  DocScanClient,
  SessionSpecificationBuilder,
} = require('../..');

const CreateSessionResult = require('../../src/doc_scan_service/session/create/create.session.result');
const GetSessionResult = require('../../src/doc_scan_service/session/retrieve/get.session.result');
const Media = require('../../src/data_type/media');
const SupportedDocumentResponse = require('../../src/doc_scan_service/support/supported.documents.response');

const GENERIC_API_PATH = '/idverify/v1';

const PEM_STRING = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');
const APP_ID = uuid();
const SESSION_ID = 'some-session-id';
const MEDIA_ID = 'some-media-id';

describe.each([
  [
    'default',
    {
      apiUrlDomain: config.yoti.docScanApi.replace(GENERIC_API_PATH, ''),
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
])('DocScanClient (%s)', (description, { apiUrlDomain, apiUrlPath, useDefaultApiUrl }) => {
  const createSessionUriRegExp = new RegExp(`${apiUrlPath}/sessions\\?sdkId=${APP_ID}`);
  const sessionUriRegExp = new RegExp(`${apiUrlPath}/sessions/${SESSION_ID}\\?sdkId=${APP_ID}`);
  const sessionMediaUriRegExp = new RegExp(`${apiUrlPath}/sessions/${SESSION_ID}/media/${MEDIA_ID}/content\\?sdkId=${APP_ID}`);
  const supportedDocumentsUriRegExp = new RegExp(`${apiUrlPath}/supported-documents`);

  let docScanClient;

  beforeEach(() => {
    if (useDefaultApiUrl) {
      docScanClient = new DocScanClient(APP_ID, PEM_STRING);
    } else {
      docScanClient = new DocScanClient(APP_ID, PEM_STRING, { apiUrl: apiUrlDomain + apiUrlPath });
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

    it('should return a DocScan session', (done) => {
      docScanClient
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
    const setupResponse = (responseStatusCode = 204) => {
      nock(apiUrlDomain)
        .delete(sessionMediaUriRegExp)
        .reply(responseStatusCode);
    };

    beforeEach(() => {
      setupResponse();
    });

    it('should have no response', (done) => {
      docScanClient
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

    describe('when a valid response is returned', () => {
      beforeEach(() => {
        setupResponse(JSON.stringify({}));
      });

      it('should return SupportedDocumentResponse', (done) => {
        docScanClient
          .getSupportedDocuments()
          .then((result) => {
            expect(result).toBeInstanceOf(SupportedDocumentResponse);
            done();
          })
          .catch(done);
      });
    });
  });
});
