const fs = require('fs');
const nock = require('nock');
const { v4: uuid } = require('uuid');
const config = require('../../config');
const {
  DigitalIdentityService,
} = require('../../src/digital_identity_service');
const {
  DigitalIdentityBuilders: { ShareSessionConfigurationBuilder, PolicyBuilder },
} = require('../..');

const privateKeyFile = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');

const APP_ID = uuid();

describe('DigitalIdentityService', () => {
  const apiUrlDomain = 'https://some.api.com';
  const apiUrlPath = '/api/v1';
  const apiUrl = apiUrlDomain + apiUrlPath;

  let digitalIdentityService;

  beforeAll(() => {
    digitalIdentityService = new DigitalIdentityService(APP_ID, privateKeyFile, { apiUrl });
  });

  describe('#fetchReceiptById', () => {
    describe('when a valid response is returned', () => {
      it('should get the correct response', async () => {
        const receiptId = 'test_receipt_id';
        nock(config.yoti.digitalIdentityApi)
          .get(new RegExp('/v2/receipts'))
          .reply(200, {
            id: 'test_receipt_id',
            sessionId: 'test_receipt_session_id',
            timestamp: '2003-11-04T12:51:07Z',
          });

        const client = new DigitalIdentityService(
          APP_ID,
          privateKeyFile,
          { apiUrl: config.yoti.digitalIdentityApi }
        );

        const receipt = await client.fetchReceiptById(receiptId);

        expect(receipt.getId()).toEqual('test_receipt_id');
        expect(receipt.getSessionId()).toEqual('test_receipt_session_id');
        expect(receipt.getTimestamp().toUTCString()).toEqual('Tue, 04 Nov 2003 12:51:07 GMT');
      });
    });

    describe('when an invalid response is returned', () => {
      [
        {
          error: 'Receipt ID must be a string',
          json: '{"id":0}',
          status: 200,
        },
        {
          error: 'Session ID must be a string',
          json: '{"id": "test_receipt_id", "sessionId":0}',
          status: 200,
        },
        {
          error: 'timestamp must be a string',
          json: '{"id": "test_receipt_id", "sessionId":"test_session_id", "timestamp": 0}',
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
        it('promise should reject', async () => {
          const receiptId = 'test_receipt_id';
          nock(`${config.yoti.connectApi}`)
            .get(new RegExp('/v2/receipts'))
            .reply(invalidResponse.status, invalidResponse.json);

          const client = new DigitalIdentityService(
            APP_ID,
            privateKeyFile,
            { apiUrl: config.yoti.digitalIdentityApi }
          );

          try {
            await client.fetchReceiptById(receiptId);
          } catch (err) {
            expect(err.message).toBe(invalidResponse.error);
          }
        });
      });
    });
  });

  describe('#fetchReceiptItemKey', () => {
    describe('when a valid response is returned', () => {
      it('should get the correct response', async () => {
        const receiptItemKeyId = 'test_receipt_item_key_id';
        nock(config.yoti.digitalIdentityApi)
          .get(new RegExp('/v2/wrapped-item-keys'))
          .reply(200, {
            id: 'test_receipt_item_key_id',
            iv: 'test_receipt_item_key_iv',
            value: 'test_receipt_item_key_value',
          });

        const client = new DigitalIdentityService(
          APP_ID,
          privateKeyFile,
          { apiUrl: config.yoti.digitalIdentityApi }
        );

        const receipt = await client.fetchReceiptItemKey(receiptItemKeyId);

        expect(receipt.getId()).toEqual('test_receipt_item_key_id');
        expect(receipt.getIv()).toEqual('test_receipt_item_key_iv');
        expect(receipt.getValue()).toEqual('test_receipt_item_key_value');
      });
    });

    describe('when an invalid response is returned', () => {
      [
        {
          error: 'Receipt wrapped item key ID must be a string',
          json: '{"id":0}',
          status: 200,
        },
        {
          error: 'Receipt wrapped item key iv must be a string',
          json: '{"id": "h", "iv": 0}',
          status: 200,
        },
        {
          error: 'Receipt wrapped item key value must be a string',
          json: '{"id": "h", "iv": "h", "value": 0}',
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
        it('promise should reject', async () => {
          const receiptItemKeyId = 'test_receipt_item_key_id';
          nock(config.yoti.connectApi)
            .get(new RegExp('/v2/wrapped-item-keys'))
            .reply(invalidResponse.status, invalidResponse.json);

          const client = new DigitalIdentityService(
            APP_ID,
            privateKeyFile,
            { apiUrl: config.yoti.digitalIdentityApi }
          );

          try {
            await client.fetchReceiptItemKey(receiptItemKeyId);
          } catch (err) {
            expect(err.message).toBe(invalidResponse.error);
          }
        });
      });
    });
  });

  describe('#createShareSession', () => {
    const setupResponse = (responseBody, responseStatusCode = 200) => {
      nock(apiUrlDomain)
        .post(new RegExp('/v2/sessions[^/]'))
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
      ].forEach((invalidResponse) => {
        it('promise should reject', (done) => {
          setupResponse(invalidResponse.json, invalidResponse.status);

          const shareSessionConfig = new ShareSessionConfigurationBuilder()
            .withRedirectUri('/test-callback-url')
            .withPolicy(new PolicyBuilder().build())
            .build();

          digitalIdentityService.createShareSession(shareSessionConfig)
            .catch((err) => {
              expect(err.message).toBe(invalidResponse.error);
              done();
            })
            .catch(done);
        });
      });
    });

    describe('when an error response is received', () => {
      [
        {
          error: 'Bad Request',
          json: { error: 'INVALID_PAYLOAD', message: 'This is not quite right' },
          status: 400,
        },
        {
          error: 'Forbidden',
          json: { error: 'INVALID_ORG_STATUS', message: 'Org is not quite ok' },
          status: 403,
        },
        {
          error: 'Internal Server Error',
          json: '',
          status: 500,
        },
      ].forEach((invalidResponse) => {
        it('promise should reject', (done) => {
          setupResponse(invalidResponse.json, invalidResponse.status);

          const shareSessionConfig = new ShareSessionConfigurationBuilder()
            .withRedirectUri('/test-callback-url')
            .withPolicy(new PolicyBuilder().build())
            .build();

          digitalIdentityService.createShareSession(shareSessionConfig)
            .catch((err) => {
              expect(err.message).toBe(invalidResponse.error);
              expect(err.status).toBe(invalidResponse.status);
              if (invalidResponse.json) {
                expect(err.code).toBe(invalidResponse.json.error);
                expect(err.reason).toBe(invalidResponse.json.message);
              }
              done();
            })
            .catch(done);
        });
      });
    });
  });

  describe('#fetchShareSession', () => {
    const SESSION_ID = '123';

    const setupResponse = (responseBody, responseStatusCode = 200) => {
      nock(apiUrlDomain)
        .get(new RegExp(`/v2/sessions/${SESSION_ID}`))
        .reply(responseStatusCode, responseBody);
    };

    describe('when a valid response is returned', () => {
      beforeEach(() => {
        const content = {
          id: SESSION_ID,
          status: '',
          created: '2023-02-01',
          updated: '2023-02-01',
          expiry: '2023-02-03',
          qrCode: {
            id: '1',
          },
          receipt: {
            id: '2',
          },
        };
        setupResponse(content);
      });

      it('should get the correct response', (done) => {
        digitalIdentityService.fetchShareSession(SESSION_ID)
          .then((result) => {
            expect(result.getId()).toBe('123');
            expect(result.getStatus()).toBe('');
            expect(result.getExpiry().toString()).toBe(new Date('2023-02-03').toString());
            expect(result.getUpdated().toString()).toBe(new Date('2023-02-01').toString());
            expect(result.getCreated().toString()).toBe(new Date('2023-02-01').toString());
            expect(result.getScannedQrCodeId()).toEqual('1');
            expect(result.getReceiptId()).toEqual('2');
            done();
          })
          .catch(done);
      });
    });

    describe('when a sessionId is not provided', () => {
      it('should throw error', async () => {
        try {
          await digitalIdentityService.fetchShareSession([]);
        } catch (error) {
          expect(error).toEqual(new TypeError('sessionId must be a string'));
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
          error: 'Created must be a date like string',
          json: '{"status":"a", "id":"1", "created": []}',
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
          setupResponse(invalidResponse.json, invalidResponse.status);

          digitalIdentityService.fetchShareSession(SESSION_ID)
            .catch((err) => {
              expect(err.message).toBe(invalidResponse.error);
              done();
            })
            .catch(done);
        });
      });
    });

    describe('when an error response is received', () => {
      [
        {
          error: 'Bad Request',
          json: { error: 'INVALID_PAYLOAD', message: 'This is not quite right' },
          status: 400,
        },
        {
          error: 'Forbidden',
          json: { error: 'INVALID_ORG_STATUS', message: 'Org is not quite ok' },
          status: 403,
        },
        {
          error: 'Internal Server Error',
          json: '',
          status: 500,
        },
      ].forEach((invalidResponse) => {
        it('promise should reject', (done) => {
          setupResponse(invalidResponse.json, invalidResponse.status);

          digitalIdentityService.fetchShareSession(SESSION_ID)
            .catch((err) => {
              expect(err.message).toBe(invalidResponse.error);
              expect(err.status).toBe(invalidResponse.status);
              if (invalidResponse.json) {
                expect(err.code).toBe(invalidResponse.json.error);
                expect(err.reason).toBe(invalidResponse.json.message);
              }
              done();
            })
            .catch(done);
        });
      });
    });
  });

  describe('#createShareQrCode', () => {
    const sessionId = 'session-6d9a999d-30bc-4733-b68c-518133531d1c';

    const setupResponse = (responseBody, responseStatusCode = 200) => {
      nock(apiUrlDomain)
        .post(new RegExp(`/v2/sessions/${sessionId}/qr-codes`))
        .reply(responseStatusCode, responseBody);
    };

    describe('when a valid response is returned', () => {
      beforeEach(() => {
        const content = {
          id: 'qr-code-id',
          uri: 'https://test.com',
        };
        setupResponse(content);
      });

      it('should get the correct response', (done) => {
        digitalIdentityService.createShareQrCode(sessionId)
          .then((result) => {
            expect(result.getId()).toBe('qr-code-id');
            expect(result.getUri()).toBe('https://test.com');
            done();
          })
          .catch(done);
      });
    });

    describe('when a session id is not provided', () => {
      it('should throw error', async () => {
        try {
          await digitalIdentityService.createShareQrCode();
        } catch (error) {
          expect(error).toEqual(new TypeError('sessionId must be a string'));
        }
      });
    });

    describe('when an invalid response is returned', () => {
      [
        {
          error: 'QR code ID must be a string',
          json: '{"status":"a"}',
          status: 200,
        },
      ].forEach((invalidResponse) => {
        beforeEach(() => {
          setupResponse(invalidResponse.json, invalidResponse.status);
        });

        it('promise should reject', (done) => {
          digitalIdentityService.createShareQrCode(sessionId)
            .catch((err) => {
              expect(err.message).toBe(invalidResponse.error);
              done();
            })
            .catch(done);
        });
      });
    });

    describe('when an error response is received', () => {
      [
        {
          error: 'Bad Request',
          json: { error: 'INVALID_PAYLOAD', message: 'This is not quite right' },
          status: 400,
        },
        {
          error: 'Forbidden',
          json: { error: 'INVALID_ORG_STATUS', message: 'Org is not quite ok' },
          status: 403,
        },
        {
          error: 'Internal Server Error',
          json: '',
          status: 500,
        },
      ].forEach((invalidResponse) => {
        it('promise should reject', (done) => {
          setupResponse(invalidResponse.json, invalidResponse.status);

          digitalIdentityService.createShareQrCode(sessionId)
            .catch((err) => {
              expect(err.message).toBe(invalidResponse.error);
              expect(err.status).toBe(invalidResponse.status);
              if (invalidResponse.json) {
                expect(err.code).toBe(invalidResponse.json.error);
                expect(err.reason).toBe(invalidResponse.json.message);
              }
              done();
            })
            .catch(done);
        });
      });
    });
  });

  describe('#fetchShareQrCode', () => {
    const qrCodeId = 'qr-code-id';

    const setupResponse = (responseBody, responseStatusCode = 200) => {
      nock(apiUrlDomain)
        .get(new RegExp(`/v2/qr-codes/${qrCodeId}`))
        .reply(responseStatusCode, responseBody);
    };

    describe('when a valid response is returned', () => {
      beforeEach(() => {
        const content = {
          id: 'qr-code-id',
          expiry: '2023-02-16T11:30:20.432Z',
          session: {
            id: 'session-id',
            status: 'CREATED',
            expiry: '2023-02-16T11:30:20.432Z',
          },
          redirectUri: 'https://test.com',
        };
        setupResponse(content);
      });

      it('should get the correct response', (done) => {
        digitalIdentityService.fetchShareQrCode(qrCodeId)
          .then((result) => {
            expect(result.getId()).toBe('qr-code-id');
            expect(result.getExpiry()).toStrictEqual(new Date('2023-02-16T11:30:20.432Z'));
            expect(result.getSessionId()).toBe('session-id');
            expect(result.getRedirectUri()).toBe('https://test.com');
            done();
          })
          .catch(done);
      });
    });

    describe('when a QR code id is not provided', () => {
      it('should throw error', async () => {
        try {
          await digitalIdentityService.fetchShareQrCode();
        } catch (error) {
          expect(error).toEqual(new TypeError('qrCodeId must be a string'));
        }
      });
    });

    describe('when an invalid response is returned', () => {
      [
        {
          error: 'QR code ID must be a string',
          json: '{"status":"a"}',
          status: 200,
        },
      ].forEach((invalidResponse) => {
        beforeEach(() => {
          setupResponse(invalidResponse.json, invalidResponse.status);
        });

        it('promise should reject', (done) => {
          digitalIdentityService.fetchShareQrCode(qrCodeId)
            .catch((err) => {
              expect(err.message).toBe(invalidResponse.error);
              done();
            })
            .catch(done);
        });
      });
    });

    describe('when an error response is received', () => {
      [
        {
          error: 'Bad Request',
          json: { error: 'INVALID_PAYLOAD', message: 'This is not quite right' },
          status: 400,
        },
        {
          error: 'Forbidden',
          json: { error: 'INVALID_ORG_STATUS', message: 'Org is not quite ok' },
          status: 403,
        },
        {
          error: 'Internal Server Error',
          json: '',
          status: 500,
        },
      ].forEach((invalidResponse) => {
        it('promise should reject', (done) => {
          setupResponse(invalidResponse.json, invalidResponse.status);

          digitalIdentityService.fetchShareQrCode(qrCodeId)
            .catch((err) => {
              expect(err.message).toBe(invalidResponse.error);
              expect(err.status).toBe(invalidResponse.status);
              if (invalidResponse.json) {
                expect(err.code).toBe(invalidResponse.json.error);
                expect(err.reason).toBe(invalidResponse.json.message);
              }
              done();
            })
            .catch(done);
        });
      });
    });
  });
});
