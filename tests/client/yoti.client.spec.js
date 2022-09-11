const nock = require('nock');
const fs = require('fs');
const { v4: uuid } = require('uuid');

const config = require('../../config');
const yoti = require('../..');
const AmlAddress = require('../../src/aml_type').AmlAddress;
const AmlProfile = require('../../src/aml_type').AmlProfile;
const Payload = require('../../src/request/payload').Payload;
const ShareUrlResult = require('../../src/dynamic_sharing_service/share.url.result');

const GENERIC_API_PATH = '/api/v1';

const APP_ID = uuid();
const privateKeyFile = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');

const CONTENT_TYPE_HEADER_NAME = 'Content-Type';
const CONTENT_TYPE_JSON = 'application/json';
const DIGEST_KEY_HEADER_NAME = 'X-Yoti-Auth-Digest';
const DIGEST_KEY_PATTERN = /^[a-zA-Z0-9/+=]{344}$/;
const AUTH_KEY_HEADER_NAME = 'X-Yoti-Auth-Key';
const AUTH_KEY_PATTERN = /^[a-zA-Z0-9/+]{392}$/;

describe.each([
  [
    'default',
    {
      apiUrlDomain: config.yoti.connectApi.replace(GENERIC_API_PATH, ''),
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
      yotiClient = new yoti.Client(APP_ID, privateKeyFile);
    } else {
      yotiClient = new yoti.Client(APP_ID, privateKeyFile, { apiUrl: apiUrlDomain + apiUrlPath });
    }
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('#getActivityDetails', () => {
    const encryptedYotiToken = 'c31Db4y6ClxSWy26xDpa9LEX3ZTUuR-rKaAhjQWnmKilR20IshkysR5Y3Hh3R6hanOyxcu7fl5vbjikkGZZb3_iH6NjxmBXuGY_Fr23AhrHvGL9WMg4EtemVvr6VI2f_5H_PDhDpYUvv-YpEM0f_SReoVxGIc8VGfj1gukuhPyNJ9hs55-SDdUjN77JiA6FPcYZxEIaqQE_yT_c3Y4V72Jnq3RHbG0vL6SefSfY_fFsnx_HeddsJc10qJYCwAkdGzVzbJH2DQ2Swp821Gwyj9eNK54S6HvpIg7LclID7BtymG6z7cTNp3fXX7mgKYoQlh_DHmPmaiqyj398w424RBg==';
    const decryptedToken = 'i79CctmY-22ad195c-d166-49a2-af16-8f356788c9dd-be094d26-19b5-450d-afce-070101760f0b';

    const selfie = fs.readFileSync('./tests/sample-data/fixtures/selfie.txt', 'utf8');
    const phoneNumber = '+447474747474';
    const rememberMeId = 'Hig2yAT79cWvseSuXcIuCLa5lNkAPy70rxetUaeHlTJGmiwc/g1MWdYWYrexWvPU';
    const parentRememberMeId = 'f5RjVQMyoKOvO/hkv43Ik+t6d6mGfP2tdrNijH4k4qafTG0FSNUgQIvd2Z3Nx1j8';

    const setupResponse = (responseBody, responseStatusCode = 200) => {
      nock(apiUrlDomain)
        .get(new RegExp(`${apiUrlPath}/profile/${decryptedToken}.*appId=${APP_ID}&nonce=.*?&timestamp=.*?`))
        .matchHeader(DIGEST_KEY_HEADER_NAME, DIGEST_KEY_PATTERN)
        .matchHeader(AUTH_KEY_HEADER_NAME, AUTH_KEY_PATTERN)
        .reply(responseStatusCode, responseBody);
    };

    describe('when the profile has attributes', () => {
      beforeEach(() => {
        const responseContent = fs.readFileSync('./tests/sample-data/payloads/payload.json', 'utf8');
        setupResponse(responseContent);
      });

      it('should fetch and decrypt the profile', (done) => {
        yotiClient.getActivityDetails(encryptedYotiToken)
          .then((activityDetails) => {
            const profile = activityDetails.getProfile();
            const applicationProfile = activityDetails.getApplicationProfile();
            const extraData = activityDetails.getExtraData();
            const outcome = activityDetails.getOutcome();

            expect(activityDetails.getRememberMeId()).toBe(rememberMeId);
            expect(activityDetails.getParentRememberMeId()).toBe(parentRememberMeId);

            expect(outcome).toBe('SUCCESS');

            expect(profile.getPhoneNumber().getValue()).toBe(phoneNumber);
            expect(profile.getSelfie().getValue().getBase64Content()).toBe(selfie);

            const phoneNumberAnchor = profile.getPhoneNumber().getAnchors()[0];
            expect(phoneNumberAnchor.getType()).toBe('UNKNOWN');
            expect(phoneNumberAnchor.getValue()).toBe('');

            expect(applicationProfile.getName().getValue()).toBe('Node SDK Test');
            expect(applicationProfile.getUrl().getValue()).toBe('https://example.com');
            expect(applicationProfile.getLogo()).toBeNull();
            expect(applicationProfile.getReceiptBgColor().getValue()).toBe('#ffffff');

            expect(extraData).toBeDefined();
            expect(extraData.getAttributeIssuanceDetails()).toBeDefined();

            done();
          })
          .catch(done);
      });
    });

    describe('when the profile is empty', () => {
      beforeEach(() => {
        const responseContentNull = fs.readFileSync('./tests/sample-data/payloads/payload-other-party-null.json', 'utf8');
        setupResponse(responseContentNull);
      });

      it('should fetch and decrypt the empty profile', (done) => {
        yotiClient.getActivityDetails(encryptedYotiToken)
          .then((activityDetails) => {
            const profile = activityDetails.getProfile();
            const outcome = activityDetails.getOutcome();

            expect(profile).toBeDefined();
            expect(profile.getAttributesList()).toEqual([]);
            expect(activityDetails.getRememberMeId()).toBe(rememberMeId);
            expect(activityDetails.getParentRememberMeId()).toBe(parentRememberMeId);
            expect(outcome).toBe('SUCCESS');

            done();
          })
          .catch(done);
      });
    });

    describe('when the profile contains an empty object', () => {
      beforeEach(() => {
        const responseContentEmptyObj = fs.readFileSync('./tests/sample-data/payloads/payload-other-party-empty-object.json', 'utf8');
        setupResponse(responseContentEmptyObj);
      });

      it('should fetch and decrypt the empty profile', (done) => {
        yotiClient.getActivityDetails(encryptedYotiToken)
          .then((activityDetails) => {
            const profile = activityDetails.getProfile();
            const outcome = activityDetails.getOutcome();

            expect(profile).toBeDefined();
            expect(profile.getAttributesList()).toEqual([]);
            expect(activityDetails.getRememberMeId()).toBe(rememberMeId);
            expect(activityDetails.getParentRememberMeId()).toBe(parentRememberMeId);
            expect(outcome).toBe('SUCCESS');

            done();
          })
          .catch(done);
      });
    });

    describe('when the response does not have profile attributes', () => {
      beforeEach(() => {
        const responseContentNonExistent = fs.readFileSync('./tests/sample-data/payloads/payload-other-party-non-existent.json', 'utf8');
        setupResponse(responseContentNonExistent);
      });

      it('should fetch and decrypt the empty profile', (done) => {
        yotiClient.getActivityDetails(encryptedYotiToken)
          .then((activityDetails) => {
            const profile = activityDetails.getProfile();
            const outcome = activityDetails.getOutcome();

            expect(profile).toBeDefined();
            expect(profile.getAttributesList()).toEqual([]);
            expect(activityDetails.getRememberMeId()).toBe(rememberMeId);
            expect(activityDetails.getParentRememberMeId()).toBe(parentRememberMeId);
            expect(outcome).toBe('SUCCESS');

            done();
          })
          .catch(done);
      });
    });
  });

  describe('#performAmlCheck', () => {
    const amlAddress = new AmlAddress('GBR');
    const amlProfile = new AmlProfile('Edward Richard George', 'Heath', amlAddress);
    const amlPayload = new Payload(amlProfile.getData());
    const amlCheckResult = fs.readFileSync('./tests/sample-data/responses/aml-check-result.json', 'utf8');

    beforeEach((done) => {
      nock(apiUrlDomain)
        .post(new RegExp(`${apiUrlPath}/aml-check?.*appId=${APP_ID}&nonce=.*?&timestamp=.*?`), amlPayload.getPayloadJSON())
        .matchHeader(DIGEST_KEY_HEADER_NAME, DIGEST_KEY_PATTERN)
        .matchHeader(CONTENT_TYPE_HEADER_NAME, CONTENT_TYPE_JSON)
        .reply(200, amlCheckResult);

      done();
    });

    it('should return a successful result', (done) => {
      yotiClient.performAmlCheck(amlProfile)
        .then((amlResult) => {
          expect(amlResult.isOnPepList).toBe(true);
          expect(amlResult.isOnFraudList).toBe(false);
          expect(amlResult.isOnWatchList).toBe(false);

          done();
        })
        .catch(done);
    });
  });

  describe('#createShareUrl', () => {
    const dynamicScenario = new yoti.DynamicScenarioBuilder()
      .withCallbackEndpoint('/test-callback-url')
      .withPolicy(new yoti.DynamicPolicyBuilder().build())
      .build();

    const SHARE_URL_RESULT = './tests/sample-data/responses/share-url-result.json';
    beforeEach((done) => {
      nock(apiUrlDomain)
        .post(new RegExp(`${apiUrlPath}/qrcodes/apps/`), JSON.stringify(dynamicScenario))
        .matchHeader(DIGEST_KEY_HEADER_NAME, DIGEST_KEY_PATTERN)
        .matchHeader(CONTENT_TYPE_HEADER_NAME, CONTENT_TYPE_JSON)
        .reply(200, fs.readFileSync(SHARE_URL_RESULT));
      done();
    });

    afterEach((done) => {
      nock.cleanAll();
      done();
    });

    it('it should get a ShareUrlResult', (done) => {
      yotiClient.createShareUrl(dynamicScenario)
        .then((result) => {
          expect(result).toBeInstanceOf(ShareUrlResult);
          done();
        })
        .catch(done);
    });
  });
});
