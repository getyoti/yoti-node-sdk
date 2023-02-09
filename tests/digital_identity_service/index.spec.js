const fs = require('fs');
const nock = require('nock');
const { v4: uuid } = require('uuid');

const config = require('../../config');
const {
  createShareSession,
  DigitalIdentityService,
} = require('../../src/digital_identity_service');
const {
  DigitalIdentityBuilders: { ShareSessionConfigurationBuilder, PolicyBuilder },
} = require('../..');

const privateKeyFile = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');

const APP_ID = uuid();

describe('digitalIdentityService', () => {
  describe('#createShareSession', () => {
    describe('when a valid response is returned', () => {
      it('should get the correct response', (done) => {
        nock(config.yoti.digitalIdentityApi)
          .post(new RegExp('/v2/sessions'))
          .reply(200, {
            id: '1',
            status: 'a',
            expiry: '2000-02-03',
          });
        const policy = new PolicyBuilder()
          .withFullName()
          .withWantedRememberMe(false)
          .build();

        const shareSessionConfig = new ShareSessionConfigurationBuilder()
          .withRedirectUri('/test-callback-url')
          .withPolicy(policy)
          .build();

        createShareSession(shareSessionConfig, privateKeyFile, APP_ID)
          .then((result) => {
            expect(result.getId()).toBe('1');
            expect(result.getStatus()).toBe('a');
            expect(result.getExpiry().toString()).toBe(new Date('2000-02-03').toString());
            done();
          })
          .catch(done);
      });
    });

    describe('when a ShareSessionConfig is not provided', () => {
      it('should throw error', async () => {
        try {
          await createShareSession('invalid share session', privateKeyFile, APP_ID);
        } catch (error) {
          expect(error).toEqual(new TypeError('shareSessionConfig must be instance of ShareSession'));
        }
      });
    });

    describe('when an invalid response is returned', () => {
      [
        {
          error: 'Status must be a string',
          json: '{"id":"1"}',
          status: 200,
        },
        {
          error: 'Session ID must be a string',
          json: '{"status":"a"}',
          status: 200,
        },
        {
          error: 'Bad Request',
          json: '',
          status: 400,
        },
        {
          error: 'Internal Server Error',
          json: '',
          status: 500,
        },
      ].forEach((invalidResponse) => {
        it('promise should reject', (done) => {
          nock(`${config.yoti.connectApi}`)
            .post(new RegExp('/v2/sessions'))
            .reply(invalidResponse.status, invalidResponse.json);

          const shareSessionConfig = new ShareSessionConfigurationBuilder()
            .withRedirectUri('/test-callback-url')
            .withPolicy(new PolicyBuilder().build())
            .build();

          createShareSession(shareSessionConfig, privateKeyFile, APP_ID)
            .catch((err) => {
              expect(err.message).toBe(invalidResponse.error);
              done();
            })
            .catch(done);
        });
      });
    });
  });

  describe('DigitalIdentityService class', () => {
    const apiUrlDomain = 'https://some.api.com';
    const apiUrlPath = '/api/v1';
    const apiUrl = apiUrlDomain + apiUrlPath;

    let digitalIdentityService;

    beforeAll(() => {
      digitalIdentityService = new DigitalIdentityService(APP_ID, privateKeyFile, { apiUrl });
    });

    describe('#createShareSession', () => {
      const setupResponse = (responseBody, responseStatusCode = 200) => {
        nock(apiUrlDomain)
          .post(new RegExp('/v2/sessions'))
          .reply(responseStatusCode, responseBody);
      };

      describe('when a valid response is returned', () => {
        beforeEach(() => {
          const content = {
            id: '1',
            status: 'a',
            expiry: '2000-02-03',
          };
          setupResponse(content);
        });

        it('should get the correct response', (done) => {
          const policy = new PolicyBuilder()
            .withFullName()
            .withWantedRememberMe(false)
            .build();

          const shareSessionConfig = new ShareSessionConfigurationBuilder()
            .withRedirectUri('/test-callback-url')
            .withPolicy(policy)
            .build();

          digitalIdentityService.createShareSession(shareSessionConfig)
            .then((result) => {
              expect(result.getId()).toBe('1');
              expect(result.getStatus()).toBe('a');
              expect(result.getExpiry().toString()).toBe(new Date('2000-02-03').toString());
              done();
            })
            .catch(done);
        });
      });

      describe('when a ShareSessionConfig is not provided', () => {
        it('should throw error', async () => {
          try {
            await digitalIdentityService.createShareSession('invalid share session');
          } catch (error) {
            expect(error).toEqual(new TypeError('shareSessionConfig must be instance of ShareSession'));
          }
        });
      });

      describe('when an invalid response is returned', () => {
        [
          {
            error: 'Status must be a string',
            json: '{"id":"1"}',
            status: 200,
          },
          {
            error: 'Session ID must be a string',
            json: '{"status":"a"}',
            status: 200,
          },
          {
            error: 'Bad Request',
            json: '',
            status: 400,
          },
          {
            error: 'Internal Server Error',
            json: '',
            status: 500,
          },
        ].forEach((invalidResponse) => {
          beforeEach(() => {
            setupResponse(invalidResponse.json, invalidResponse.status);
          });

          it('promise should reject', (done) => {
            const shareSessionConfig = new ShareSessionConfigurationBuilder()
              .withRedirectUri('/test-callback-url')
              .withPolicy(new PolicyBuilder().build())
              .build();

            digitalIdentityService.createShareSession(shareSessionConfig, privateKeyFile, APP_ID)
              .catch((err) => {
                expect(err.message).toBe(invalidResponse.error);
                done();
              })
              .catch(done);
          });
        });
      });
    });
  });
});
