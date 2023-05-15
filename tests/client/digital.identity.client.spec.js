jest.mock('../../src/digital_identity_service/receipts/decryption.utils');
jest.mock('../../src/digital_identity_service/receipts/content.factory');
const nock = require('nock');
const fs = require('fs');
const { v4: uuid } = require('uuid');

const config = require('../../config');
const yoti = require('../../index');
const DecryptionUtils = require('../../src/digital_identity_service/receipts/decryption.utils');
const ContentFactory = require('../../src/digital_identity_service/receipts/content.factory');
const CreateShareSessionResult = require('../../src/digital_identity_service/create.share.session.result');
const GetShareSessionResult = require('../../src/digital_identity_service/get.share.session.result');
const CreateShareQrCodeResult = require('../../src/digital_identity_service/create.share.qr.code.result');
const GetShareQrCodeResult = require('../../src/digital_identity_service/get.share.qr.code.result');
const ApplicationContent = require('../../src/digital_identity_service/receipts/application.content');
const UserContent = require('../../src/digital_identity_service/receipts/user.content');

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

  describe('#getShareReceipt', () => {
    afterEach(() => {
      ContentFactory.buildUserContentFromEncryptedContent.mockReset();
      ContentFactory.buildApplicationContentFromEncryptedContent.mockReset();
    });

    it('it should get a Receipt', async () => {
      const mockReceiptContent = {
        profile: 'some-content-profile',
        extraData: 'some-content-extra-data',
      };
      const mockReceiptOtherPartyContent = {
        profile: 'some-other-party-content-profile',
        extraData: 'some-other-party-content-extra-data',
      };
      nock(apiUrlDomain)
        .get(new RegExp(`${apiUrlPath}/v2/receipts`))
        .reply(200, {
          id: 'test_receipt_id',
          sessionId: 'test_receipt_session_id',
          timestamp: '2003-11-04T12:51:07Z',
          wrappedItemKeyId: 'some_wrapped_item_key',
          content: mockReceiptContent,
          otherPartyContent: mockReceiptOtherPartyContent,
        });

      nock(apiUrlDomain)
        .get(new RegExp(`${apiUrlPath}/v2/wrapped-item-keys/some_wrapped_item_key`))
        .reply(200, {
          id: 'some_wrapped_item_key',
          iv: 'some_iv',
          value: 'some_key',
        });

      const mockReceiptKey = 'some-receipt-key';
      DecryptionUtils.unwrapReceiptKey.mockReturnValue(mockReceiptKey);

      const userContent = new UserContent();
      const applicationContent = new ApplicationContent();
      ContentFactory.buildUserContentFromEncryptedContent
        .mockReturnValue(userContent);
      ContentFactory.buildApplicationContentFromEncryptedContent
        .mockReturnValue(applicationContent);

      const receipt = await yotiClient.getShareReceipt('test_receipt_id');

      expect(ContentFactory.buildUserContentFromEncryptedContent).toHaveBeenCalledTimes(1);
      expect(ContentFactory.buildUserContentFromEncryptedContent)
        .toHaveBeenCalledWith(mockReceiptOtherPartyContent, mockReceiptKey);

      expect(ContentFactory.buildApplicationContentFromEncryptedContent).toHaveBeenCalledTimes(1);
      expect(ContentFactory.buildApplicationContentFromEncryptedContent)
        .toHaveBeenCalledWith(mockReceiptContent, mockReceiptKey);

      expect(receipt.getReceiptId()).toEqual('test_receipt_id');
      expect(receipt.getSessionId()).toEqual('test_receipt_session_id');
      expect(receipt.getUserContent()).toEqual(userContent);
      expect(receipt.getApplicationContent()).toEqual(applicationContent);
    });
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

    it('it should get a CreateShareSessionResult', (done) => {
      yotiClient.createShareSession(shareSessionConfig)
        .then((result) => {
          expect(result).toBeInstanceOf(CreateShareSessionResult);
          done();
        })
        .catch(done);
    });
  });

  describe('#getShareSession', () => {
    const SESSION_ID = '123';
    const mockedResponse = {
      id: SESSION_ID,
      status: '',
      created: '2023-02-01',
      updated: '2023-02-01',
      expiry: '2023-02-03',
      qrCode: {
        id: '',
      },
      receipt: {
        id: '',
      },
    };
    beforeEach((done) => {
      nock(apiUrlDomain)
        .get(new RegExp(`${apiUrlPath}/v2/sessions/${SESSION_ID}`))
        .reply(200, mockedResponse);
      done();
    });

    afterEach((done) => {
      nock.cleanAll();
      done();
    });

    it('it should get a GetShareSessionResult', (done) => {
      yotiClient.getShareSession(SESSION_ID)
        .then((result) => {
          expect(result).toBeInstanceOf(GetShareSessionResult);
          done();
        })
        .catch(done);
    });
  });

  describe('#createShareQrCode', () => {
    const sessionId = 'session-6d9a999d-30bc-4733-b68c-518133531d1c';

    beforeEach((done) => {
      nock(apiUrlDomain)
        .post(new RegExp(`${apiUrlPath}/v2/sessions/${sessionId}/qr-codes`))
        .matchHeader(DIGEST_KEY_HEADER_NAME, DIGEST_KEY_PATTERN)
        .matchHeader(CONTENT_TYPE_HEADER_NAME, CONTENT_TYPE_JSON)
        .reply(200, {
          id: 'qr-code-c69d77b4-2235-4f02-95a0-d3f911d5d3e8',
          uri: 'https://code.localhost.yoti.com/CAEaLHFyLWNvZGUtYzY5ZDc3YjQtMjIzNS00ZjAyLTk1YTAtZDNmOTExZDVkM2U4',
        });
      done();
    });

    afterEach((done) => {
      nock.cleanAll();
      done();
    });

    it('should return a CreateShareQrCodeResult', (done) => {
      yotiClient.createShareQrCode(sessionId)
        .then((result) => {
          expect(result).toBeInstanceOf(CreateShareQrCodeResult);
          done();
        })
        .catch(done);
    });
  });

  describe('#getShareQrCode', () => {
    const qrCodeId = 'qr-code-id';

    beforeEach((done) => {
      nock(apiUrlDomain)
        .get(new RegExp(`${apiUrlPath}/v2/qr-codes/${qrCodeId}`))
        .matchHeader(DIGEST_KEY_HEADER_NAME, DIGEST_KEY_PATTERN)
        .reply(200, {
          id: 'qr-code-id',
          expiry: '2023-02-16T11:30:20.432Z',
          session: {
            id: 'session-id',
            status: 'CREATED',
            expiry: '2023-02-16T11:30:20.432Z',
          },
          redirectUri: 'https://test.com',
        });
      done();
    });

    afterEach((done) => {
      nock.cleanAll();
      done();
    });

    it('should return a GetShareQrCodeResult', (done) => {
      yotiClient.getShareQrCode(qrCodeId)
        .then((result) => {
          expect(result).toBeInstanceOf(GetShareQrCodeResult);
          done();
        })
        .catch(done);
    });
  });
});
