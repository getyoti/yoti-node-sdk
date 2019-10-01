const nock = require('nock');
const fs = require('fs');
const { SandboxClientBuilder, TokenRequestBuilder } = require('../../sandbox');
const SandboxClient = require('../../sandbox/client');

const SOME_APP_ID = 'someAppId';
const SOME_SANDBOX_URL = 'https://somesandbox.yoti.com/api/v1';
const SOME_ENDPOINT_PATTERN = new RegExp(`^/api/v1/apps/${SOME_APP_ID}/tokens`);
const SOME_PEM_FILE_PATH = './tests/sample-data/keys/node-sdk-test.pem';
const SOME_PEM_STRING = fs.readFileSync(SOME_PEM_FILE_PATH, 'utf8');
const SOME_TOKEN_REQUEST = new TokenRequestBuilder().build();
const SOME_TOKEN = 'someToken';

describe('SandboxClient', () => {
  it('should build with pem string', () => {
    const sandboxClient = new SandboxClientBuilder()
      .forApplication(SOME_APP_ID)
      .withPemString(SOME_PEM_STRING)
      .withSandboxUrl(SOME_SANDBOX_URL)
      .build();
    expect(sandboxClient).toBeInstanceOf(SandboxClient);
  });
  it('should build with pem file path', () => {
    const sandboxClient = new SandboxClientBuilder()
      .forApplication(SOME_APP_ID)
      .withPemFilePath(SOME_PEM_FILE_PATH)
      .withSandboxUrl(SOME_SANDBOX_URL)
      .build();
    expect(sandboxClient).toBeInstanceOf(SandboxClient);
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
    const sandboxClient = new SandboxClientBuilder()
      .forApplication(SOME_APP_ID)
      .withPemString(SOME_PEM_STRING)
      .withSandboxUrl(SOME_SANDBOX_URL)
      .build();

    /**
     * Observe the console log.
     */
    let consoleLog;
    beforeEach(() => {
      consoleLog = jest.spyOn(global.console, 'log');
    });

    /**
     * Clean up and restore mocks.
     */
    afterEach((done) => {
      nock.cleanAll();
      done();
      consoleLog.mockRestore();
    });

    it('should return token from sandbox', (done) => {
      nock(SOME_SANDBOX_URL)
        .post(SOME_ENDPOINT_PATTERN, JSON.stringify(SOME_TOKEN_REQUEST))
        .reply(200, { token: SOME_TOKEN });

      sandboxClient.setupSharingProfile(SOME_TOKEN_REQUEST)
        .then((response) => {
          expect(response.getToken()).toBe(SOME_TOKEN);
          done();
        })
        .catch(done);
    });
    it('should throw error when invalid response is returned', (done) => {
      nock(SOME_SANDBOX_URL)
        .post(SOME_ENDPOINT_PATTERN, JSON.stringify(SOME_TOKEN_REQUEST))
        .reply(200, '""');

      sandboxClient
        .setupSharingProfile(SOME_TOKEN_REQUEST)
        .catch((err) => {
          const expectedMessage = 'TokenResponse responseData should be an object';
          expect(err.message).toBe(expectedMessage);
          expect(consoleLog)
            .toHaveBeenCalledWith(`Error getting response data: Error: ${expectedMessage}`);
          done();
        });
    });
    it('should throw error when response has no token', (done) => {
      nock(SOME_SANDBOX_URL)
        .post(SOME_ENDPOINT_PATTERN, JSON.stringify(SOME_TOKEN_REQUEST))
        .reply(200, '{}');

      sandboxClient
        .setupSharingProfile(SOME_TOKEN_REQUEST)
        .catch((err) => {
          const expectedMessage = 'responseData.token must be a string';
          expect(err.message).toBe(expectedMessage);
          expect(consoleLog)
            .toHaveBeenCalledWith(`Error getting response data: TypeError: ${expectedMessage}`);
          done();
        });
    });
    [
      {
        error: 'Bad Request',
        status: 400,
      },
      {
        error: 'Internal Server Error',
        status: 500,
      },
    ].forEach((invalidResponse) => {
      it(`should throw error when response is ${invalidResponse.status}`, (done) => {
        nock(SOME_SANDBOX_URL)
          .post(SOME_ENDPOINT_PATTERN, JSON.stringify(SOME_TOKEN_REQUEST))
          .reply(invalidResponse.status, '{}');

        sandboxClient
          .setupSharingProfile(SOME_TOKEN_REQUEST)
          .catch((err) => {
            expect(err.message).toBe(invalidResponse.error);
            expect(consoleLog)
              .toHaveBeenCalledWith(`Error getting data from Connect API: ${invalidResponse.error}`);
            done();
          });
      });
    });
  });
});
