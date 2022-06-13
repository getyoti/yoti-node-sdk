const fs = require('fs');
const nock = require('nock');
const { v4: uuid } = require('uuid');

const config = require('../../config');
const {
  createShareUrl,
  DynamicShareService,
} = require('../../src/dynamic_sharing_service');
const {
  DynamicScenarioBuilder,
  DynamicPolicyBuilder,
} = require('../..');

const privateKeyFile = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');

const APP_ID = uuid();

describe('dynamicSharingService', () => {
  describe('#createShareUrl', () => {
    const QRCODE_LINK = 'https://dynamic-code.yoti.com/CAEaJDRjNTQ3M2IxLTNiNzktNDg3My1iMmM4LThiMTQxZDYwMjM5ODAC';
    const REF_ID = '4c5473b1-3b79-4873-b2c8-8b141d602398';
    const SHARE_URL_RESULT = './tests/sample-data/responses/share-url-result.json';

    describe('when a valid response is returned', () => {
      it('should get the QR code and Ref ID', (done) => {
        nock(`${config.yoti.connectApi}`)
          .post(new RegExp(`^/api/v1/qrcodes/apps/${APP_ID}`))
          .reply(200, fs.readFileSync(SHARE_URL_RESULT));

        const dynamicPolicy = new DynamicPolicyBuilder()
          .withFullName()
          .withWantedRememberMe(false)
          .build();

        const dynamicScenario = new DynamicScenarioBuilder()
          .withCallbackEndpoint('/test-callback-url')
          .withPolicy(dynamicPolicy)
          .build();

        createShareUrl(dynamicScenario, privateKeyFile, APP_ID)
          .then((result) => {
            expect(result.getShareUrl()).toBe(QRCODE_LINK);
            expect(result.getRefId()).toBe(REF_ID);
            done();
          })
          .catch(done);
      });
    });

    describe('when a DynamicScenario is not provided', () => {
      it('should throw error', () => {
        expect(() => createShareUrl('invalid scenario', privateKeyFile, APP_ID))
          .toThrow(new TypeError('dynamicScenario must be instance of DynamicScenario'));
      });
    });

    describe('when an invalid response is returned', () => {
      [
        {
          error: 'QR Code URL must be a string',
          json: '{"ref_id":"a-ref-id"}',
          status: 200,
        },
        {
          error: 'Ref ID must be a string',
          json: '{"qrcode":"https://dynamic-code.yoti.com/test-url"}',
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
            .post(new RegExp(`^/api/v1/qrcodes/apps/${APP_ID}`))
            .reply(invalidResponse.status, invalidResponse.json);

          const dynamicScenario = new DynamicScenarioBuilder()
            .withCallbackEndpoint('/test-callback-url')
            .withPolicy(new DynamicPolicyBuilder().build())
            .build();

          createShareUrl(dynamicScenario, privateKeyFile, APP_ID)
            .catch((err) => {
              expect(err.message).toBe(invalidResponse.error);
              done();
            })
            .catch(done);
        });
      });
    });
  });

  describe('DynamicShareService class', () => {
    const apiUrlDomain = 'https://some.api.com';
    const apiUrlPath = '/api/v1';
    const apiUrl = apiUrlDomain + apiUrlPath;

    let dynamicShareService;

    beforeAll(() => {
      dynamicShareService = new DynamicShareService(APP_ID, privateKeyFile, { apiUrl });
    });

    describe('#createShareUrl', () => {
      const QRCODE_LINK = 'https://dynamic-code.yoti.com/CAEaJDRjNTQ3M2IxLTNiNzktNDg3My1iMmM4LThiMTQxZDYwMjM5ODAC';
      const REF_ID = '4c5473b1-3b79-4873-b2c8-8b141d602398';
      const SHARE_URL_RESULT = './tests/sample-data/responses/share-url-result.json';

      const setupResponse = (responseBody, responseStatusCode = 200) => {
        nock(apiUrlDomain)
          .post(new RegExp(`${apiUrlPath}/qrcodes/apps/${APP_ID}`))
          .reply(responseStatusCode, responseBody);
      };

      describe('when a valid response is returned', () => {
        beforeEach(() => {
          const content = fs.readFileSync(SHARE_URL_RESULT);
          setupResponse(content);
        });

        it('should get the QR code and Ref ID', (done) => {
          const dynamicPolicy = new DynamicPolicyBuilder()
            .withFullName()
            .withWantedRememberMe(false)
            .build();

          const dynamicScenario = new DynamicScenarioBuilder()
            .withCallbackEndpoint('/test-callback-url')
            .withPolicy(dynamicPolicy)
            .build();

          dynamicShareService.createShareUrl(dynamicScenario, privateKeyFile, APP_ID)
            .then((result) => {
              expect(result.getShareUrl()).toBe(QRCODE_LINK);
              expect(result.getRefId()).toBe(REF_ID);
              done();
            })
            .catch(done);
        });
      });

      describe('when a DynamicScenario is not provided', () => {
        it('should throw error', () => {
          expect(() => dynamicShareService.createShareUrl('invalid scenario', privateKeyFile, APP_ID))
            .toThrow(new TypeError('dynamicScenario must be instance of DynamicScenario'));
        });
      });

      describe('when an invalid response is returned', () => {
        [
          {
            error: 'QR Code URL must be a string',
            json: '{"ref_id":"a-ref-id"}',
            status: 200,
          },
          {
            error: 'Ref ID must be a string',
            json: '{"qrcode":"https://dynamic-code.yoti.com/test-url"}',
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
            const dynamicScenario = new DynamicScenarioBuilder()
              .withCallbackEndpoint('/test-callback-url')
              .withPolicy(new DynamicPolicyBuilder().build())
              .build();

            dynamicShareService.createShareUrl(dynamicScenario, privateKeyFile, APP_ID)
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
