const nock = require('nock');
const fs = require('fs');
const { v4: uuid } = require('uuid');

const config = require('../../config');
const yoti = require('../../index');
const ShareSessionCreateResult = require('../../src/digital_identity_service/share.session.create.result');

const GENERIC_API_PATH = '/share';
const APP_ID = uuid();
const privateKeyFile = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');

const CONTENT_TYPE_HEADER_NAME = 'Content-Type';
const CONTENT_TYPE_JSON = 'application/json';
const DIGEST_KEY_HEADER_NAME = 'X-Yoti-Auth-Digest';
const DIGEST_KEY_PATTERN = /^[a-zA-Z0-9/+=]{344}$/;

describe.each([
  [
    'default',
    {
      apiUrlDomain: config.yoti.digitalIdentityApi.replace(GENERIC_API_PATH, ''),
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
])('YotiClient (%s)', (description, { apiUrlDomain, apiUrlPath, useDefaultApiUrl }) => {
  let yotiClient;

  beforeEach(() => {
    if (useDefaultApiUrl) {
      yotiClient = new yoti.DigitalIdentityClient(
        APP_ID,
        privateKeyFile
      );
    } else {
      yotiClient = new yoti.DigitalIdentityClient(
        APP_ID,
        privateKeyFile,
        { apiUrl: apiUrlDomain + apiUrlPath }
      );
    }
  });

  it('placeholder test', () => {
    expect(yotiClient).toBeDefined();
  });

  describe('#createShareSession', () => {
    const shareSessionConfig = new yoti.DigitalIdentityBuilders.ShareSessionConfigurationBuilder()
      .withRedirectUri('/test-redirect-url')
      .withPolicy(new yoti.DigitalIdentityBuilders.PolicyBuilder().build())
      .build();

    beforeEach((done) => {
      nock(apiUrlDomain)
        .post(new RegExp(`${apiUrlPath}/v2/sessions`), JSON.stringify(shareSessionConfig))
        .matchHeader(DIGEST_KEY_HEADER_NAME, DIGEST_KEY_PATTERN)
        .matchHeader(CONTENT_TYPE_HEADER_NAME, CONTENT_TYPE_JSON)
        .reply(200, {
          id: '',
          status: '',
          expiry: '2000-02-03',
        });
      done();
    });

    afterEach((done) => {
      nock.cleanAll();
      done();
    });

    it('it should get a ShareSessionCreateResult', (done) => {
      yotiClient.createShareSession(shareSessionConfig)
        .then((result) => {
          expect(result).toBeInstanceOf(ShareSessionCreateResult);
          done();
        })
        .catch(done);
    });
  });
});
