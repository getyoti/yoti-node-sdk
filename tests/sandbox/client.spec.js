const nock = require('nock');
const fs = require('fs');
const { SandboxClientBuilder, TokenRequestBuilder } = require('../..');

const SOME_APP_ID = 'someAppId';
const SOME_SANDBOX_URL = 'https://somesandbox.yoti.com/api/v1';
const SOME_PEM = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');
const SOME_TOKEN_REQUEST = new TokenRequestBuilder().build();
const SOME_TOKEN = 'someToken';

describe('SandboxClient', () => {
  afterEach((done) => {
    nock.cleanAll();
    done();
  });
  describe('#constructor', () => {
    it('should throw for missing app ID', () => {
      expect(() => new SandboxClientBuilder().build())
        .toThrow(new TypeError('appId must be a string'));
    });
    it('should throw for missing key', () => {
      expect(() => new SandboxClientBuilder().forApplication(SOME_APP_ID).build())
        .toThrow(new TypeError('pem must be a string'));
    });
  });
  describe('#setupSharingProfile', () => {
    beforeEach((done) => {
      nock(SOME_SANDBOX_URL)
        .post(
          new RegExp(`^/api/v1/apps/${SOME_APP_ID}/tokens`),
          JSON.stringify(SOME_TOKEN_REQUEST)
        )
        .reply(200, {
          token: SOME_TOKEN,
        });
      done();
    });
    it('should return token from sandbox', (done) => {
      const sandboxClient = new SandboxClientBuilder()
        .forApplication(SOME_APP_ID)
        .withPemString(SOME_PEM)
        .withSandboxUrl(SOME_SANDBOX_URL)
        .build();

      sandboxClient.setupSharingProfile(SOME_TOKEN_REQUEST)
        .then((response) => {
          expect(response.getToken()).toBe(SOME_TOKEN);
          done();
        })
        .catch(done);
    });
  });
});
