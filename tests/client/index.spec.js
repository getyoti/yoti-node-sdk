const nock = require('nock');
const fs = require('fs');

const config = require('../../config');
const yoti = require('../..');
const AmlAddress = require('../../src/aml_type').AmlAddress;
const AmlProfile = require('../../src/aml_type').AmlProfile;
const Payload = require('../../src/request/payload').Payload;
const ShareUrlResult = require('../../src/dynamic_sharing_service/share.url.result');

const privateKeyFile = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');
const yotiClient = new yoti.Client('stub-app-id', privateKeyFile);

const CONTENT_TYPE_HEADER_NAME = 'Content-Type';
const CONTENT_TYPE_JSON = 'application/json';
const DIGEST_KEY_HEADER_NAME = 'X-Yoti-Auth-Digest';
const DIGEST_KEY_PATTERN = /^[a-zA-Z0-9/+=]{344}$/;
const AUTH_KEY_HEADER_NAME = 'X-Yoti-Auth-Key';
const AUTH_KEY_PATTERN = /^[a-zA-Z0-9/+]{392}$/;

describe('yotiClient', () => {
  const encryptedYotiToken = 'c31Db4y6ClxSWy26xDpa9LEX3ZTUuR-rKaAhjQWnmKilR20IshkysR5Y3Hh3R6hanOyxcu7fl5vbjikkGZZb3_iH6NjxmBXuGY_Fr23AhrHvGL9WMg4EtemVvr6VI2f_5H_PDhDpYUvv-YpEM0f_SReoVxGIc8VGfj1gukuhPyNJ9hs55-SDdUjN77JiA6FPcYZxEIaqQE_yT_c3Y4V72Jnq3RHbG0vL6SefSfY_fFsnx_HeddsJc10qJYCwAkdGzVzbJH2DQ2Swp821Gwyj9eNK54S6HvpIg7LclID7BtymG6z7cTNp3fXX7mgKYoQlh_DHmPmaiqyj398w424RBg==';
  const decryptedToken = 'i79CctmY-22ad195c-d166-49a2-af16-8f356788c9dd-be094d26-19b5-450d-afce-070101760f0b';
  const profileEndpointPattern = new RegExp(`^/api/v1/profile/${decryptedToken}.*appId=stub-app-id&nonce=.*?&timestamp=.*?`);

  const selfie = fs.readFileSync('./tests/sample-data/fixtures/selfie.txt', 'utf8');
  const phoneNumber = '+447474747474';
  const rememberMeId = 'Hig2yAT79cWvseSuXcIuCLa5lNkAPy70rxetUaeHlTJGmiwc/g1MWdYWYrexWvPU';
  const parentRememberMeId = 'f5RjVQMyoKOvO/hkv43Ik+t6d6mGfP2tdrNijH4k4qafTG0FSNUgQIvd2Z3Nx1j8';

  afterEach((done) => {
    nock.cleanAll();
    done();
  });

  describe('#getActivityDetails', () => {
    describe('when the profile has attributes', () => {
      const responseContent = fs.readFileSync('./tests/sample-data/payloads/payload.json', 'utf8');

      beforeEach((done) => {
        nock(`${config.yoti.connectApi}`)
          .get(profileEndpointPattern)
          .matchHeader(DIGEST_KEY_HEADER_NAME, DIGEST_KEY_PATTERN)
          .matchHeader(AUTH_KEY_HEADER_NAME, AUTH_KEY_PATTERN)
          .reply(200, responseContent);
        done();
      });
      it('should fetch and decrypt the profile', (done) => {
        yotiClient.getActivityDetails(encryptedYotiToken)
          .then((activityDetails) => {
            const profile = activityDetails.getUserProfile();
            const extendedProfile = activityDetails.getProfile();
            const applicationProfile = activityDetails.getApplicationProfile();
            const extraData = activityDetails.getExtraData();
            const outcome = activityDetails.getOutcome();

            expect(activityDetails.getUserId()).toBe(rememberMeId);
            expect(activityDetails.getRememberMeId()).toBe(rememberMeId);
            expect(activityDetails.getParentRememberMeId()).toBe(parentRememberMeId);
            expect(activityDetails.getBase64SelfieUri()).toBe(selfie);

            expect(outcome).toBe('SUCCESS');

            expect(profile).not.toBe(undefined);
            expect(profile.phoneNumber).toBe(phoneNumber);
            expect(`data:image/jpeg;base64,${profile.selfie.toBase64()}`).toBe(selfie);

            expect(extendedProfile.getPhoneNumber().getValue()).toBe(phoneNumber);
            expect(extendedProfile.getSelfie().getValue().getBase64Content()).toBe(selfie);

            const phoneNumberAnchor = extendedProfile.getPhoneNumber().getAnchors()[0];
            expect(phoneNumberAnchor.getType()).toBe('UNKNOWN');
            expect(phoneNumberAnchor.getValue()).toBe('');

            expect(applicationProfile.getName().getValue()).toBe('Node SDK Test');
            expect(applicationProfile.getUrl().getValue()).toBe('https://example.com');
            expect(applicationProfile.getLogo().getValue().getBase64Content()).toBe('data:image/jpeg;base64,');
            expect(applicationProfile.getReceiptBgColor().getValue()).toBe('#ffffff');

            expect(extraData).not.toBe(undefined);
            expect(extraData.getAttributeIssuanceDetails()).not.toBe(undefined);

            done();
          })
          .catch(done);
      });
    });

    describe('when the profile is empty', () => {
      const responseContentNull = fs.readFileSync('./tests/sample-data/payloads/payload-other-party-null.json', 'utf8');

      beforeEach((done) => {
        nock(`${config.yoti.connectApi}`)
          .get(profileEndpointPattern)
          .matchHeader(AUTH_KEY_HEADER_NAME, AUTH_KEY_PATTERN)
          .matchHeader(DIGEST_KEY_HEADER_NAME, DIGEST_KEY_PATTERN)
          .reply(200, responseContentNull);
        done();
      });

      it('should fetch and decrypt the empty profile', (done) => {
        yotiClient.getActivityDetails(encryptedYotiToken)
          .then((activityDetails) => {
            const profile = activityDetails.getUserProfile();
            const outcome = activityDetails.getOutcome();

            expect(profile).not.toBe(undefined);
            expect(profile).toEqual({});
            expect(activityDetails.getUserId()).toBe(rememberMeId);
            expect(activityDetails.getRememberMeId()).toBe(rememberMeId);
            expect(activityDetails.getParentRememberMeId()).toBe(parentRememberMeId);
            expect(outcome).toBe('SUCCESS');

            done();
          })
          .catch(done);
      });
    });

    describe('when the profile contains an empty object', () => {
      const responseContentEmptyObj = fs.readFileSync('./tests/sample-data/payloads/payload-other-party-empty-object.json', 'utf8');

      beforeEach((done) => {
        nock(`${config.yoti.connectApi}`)
          .get(profileEndpointPattern)
          .matchHeader(AUTH_KEY_HEADER_NAME, AUTH_KEY_PATTERN)
          .matchHeader(DIGEST_KEY_HEADER_NAME, DIGEST_KEY_PATTERN)
          .reply(200, responseContentEmptyObj);
        done();
      });

      it('should fetch and decrypt the empty profile', (done) => {
        yotiClient.getActivityDetails(encryptedYotiToken)
          .then((activityDetails) => {
            const profile = activityDetails.getUserProfile();
            const outcome = activityDetails.getOutcome();

            expect(profile).not.toBe(undefined);
            expect(profile).toEqual({});
            expect(activityDetails.getUserId()).toBe(rememberMeId);
            expect(activityDetails.getRememberMeId()).toBe(rememberMeId);
            expect(activityDetails.getParentRememberMeId()).toBe(parentRememberMeId);
            expect(outcome).toBe('SUCCESS');

            done();
          })
          .catch(done);
      });
    });

    describe('when the response does not have profile attributes', () => {
      const responseContentNonExistent = fs.readFileSync('./tests/sample-data/payloads/payload-other-party-non-existent.json', 'utf8');

      beforeEach((done) => {
        nock(`${config.yoti.connectApi}`)
          .get(profileEndpointPattern)
          .matchHeader(AUTH_KEY_HEADER_NAME, AUTH_KEY_PATTERN)
          .matchHeader(DIGEST_KEY_HEADER_NAME, DIGEST_KEY_PATTERN)
          .reply(200, responseContentNonExistent);
        done();
      });

      it('should fetch and decrypt the empty profile', (done) => {
        yotiClient.getActivityDetails(encryptedYotiToken)
          .then((activityDetails) => {
            const profile = activityDetails.getUserProfile();
            const outcome = activityDetails.getOutcome();

            expect(profile).not.toBe(undefined);
            expect(profile).toEqual({});
            expect(activityDetails.getUserId()).toBe(rememberMeId);
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
      nock(`${config.yoti.connectApi}`)
        .post(new RegExp('^/api/v1/aml-check?.*appId=stub-app-id&nonce=.*?&timestamp=.*?'), amlPayload.getPayloadJSON())
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
      nock(`${config.yoti.connectApi}`)
        .post(new RegExp('^/api/v1/qrcodes/apps/'), JSON.stringify(dynamicScenario))
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
