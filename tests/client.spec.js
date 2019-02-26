const expect = require('chai').expect;
const nock = require('nock');
const fs = require('fs');

const config = require('../config');
const yoti = require('..');
const AmlAddress = require('../src/aml_type').AmlAddress;
const AmlProfile = require('../src/aml_type').AmlProfile;
const Payload = require('../src/request/payload').Payload;

const privateKeyFile = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');
const yotiClient = new yoti.Client('stub-app-id', privateKeyFile);

describe('yotiClient', () => {
  const encryptedYotiToken = 'c31Db4y6ClxSWy26xDpa9LEX3ZTUuR-rKaAhjQWnmKilR20IshkysR5Y3Hh3R6hanOyxcu7fl5vbjikkGZZb3_iH6NjxmBXuGY_Fr23AhrHvGL9WMg4EtemVvr6VI2f_5H_PDhDpYUvv-YpEM0f_SReoVxGIc8VGfj1gukuhPyNJ9hs55-SDdUjN77JiA6FPcYZxEIaqQE_yT_c3Y4V72Jnq3RHbG0vL6SefSfY_fFsnx_HeddsJc10qJYCwAkdGzVzbJH2DQ2Swp821Gwyj9eNK54S6HvpIg7LclID7BtymG6z7cTNp3fXX7mgKYoQlh_DHmPmaiqyj398w424RBg==';

  const selfie = fs.readFileSync('./tests/sample-data/fixtures/selfie.txt', 'utf8');
  const phoneNumber = '+447474747474';
  const rememberMeId = 'Hig2yAT79cWvseSuXcIuCLa5lNkAPy70rxetUaeHlTJGmiwc/g1MWdYWYrexWvPU';
  const parentRememberMeId = 'f5RjVQMyoKOvO/hkv43Ik+t6d6mGfP2tdrNijH4k4qafTG0FSNUgQIvd2Z3Nx1j8';

  afterEach((done) => {
    nock.cleanAll();
    done();
  });

  describe('#getActivityDetails', () => {
    context('when the profile has attributes', () => {
      const responseContent = fs.readFileSync('./tests/sample-data/payloads/payload.json', 'utf8');

      beforeEach((done) => {
        nock(`${config.yoti.connectApi}`)
          .get(new RegExp('^/api/v1/profile/'))
          .reply(200, responseContent);
        done();
      });

      it('should fetch and decrypt the profile', (done) => {
        yotiClient.getActivityDetails(encryptedYotiToken)
          .then((activityDetails) => {
            const profile = activityDetails.getUserProfile();
            const outcome = activityDetails.getOutcome();

            expect(profile).to.not.equal(undefined);
            expect(activityDetails.getRememberMeId()).to.equal(rememberMeId);
            expect(activityDetails.getParentRememberMeId()).to.equal(parentRememberMeId);
            expect(profile.phoneNumber).to.equal(phoneNumber);
            expect(`data:image/jpeg;base64,${profile.selfie.toBase64()}`).to.equal(selfie);
            expect(activityDetails.getBase64SelfieUri()).to.equal(selfie);
            expect(outcome).to.equal('SUCCESS');

            done();
          })
          .catch(done);
      });
    });

    context('when the profile is empty', () => {
      const responseContentNull = fs.readFileSync('./tests/sample-data/payloads/payload-other-party-null.json', 'utf8');

      beforeEach((done) => {
        nock(`${config.yoti.connectApi}`)
          .get(new RegExp('^/api/v1/profile/'))
          .reply(200, responseContentNull);
        done();
      });

      it('should fetch and decrypt the empty profile', (done) => {
        yotiClient.getActivityDetails(encryptedYotiToken)
          .then((activityDetails) => {
            const profile = activityDetails.getUserProfile();
            const outcome = activityDetails.getOutcome();

            expect(profile).to.not.equal(undefined);
            expect(profile).to.deep.equal({});
            expect(activityDetails.getRememberMeId()).to.equal(rememberMeId);
            expect(activityDetails.getParentRememberMeId()).to.equal(parentRememberMeId);
            expect(outcome).to.equal('SUCCESS');

            done();
          })
          .catch(done);
      });
    });

    context('when the profile contains an empty object', () => {
      const responseContentEmptyObj = fs.readFileSync('./tests/sample-data/payloads/payload-other-party-empty-object.json', 'utf8');

      beforeEach((done) => {
        nock(`${config.yoti.connectApi}`)
          .get(new RegExp('^/api/v1/profile/'))
          .reply(200, responseContentEmptyObj);
        done();
      });

      it('should fetch and decrypt the empty profile', (done) => {
        yotiClient.getActivityDetails(encryptedYotiToken)
          .then((activityDetails) => {
            const profile = activityDetails.getUserProfile();
            const outcome = activityDetails.getOutcome();

            expect(profile).to.not.equal(undefined);
            expect(profile).to.deep.equal({});
            expect(activityDetails.getRememberMeId()).to.equal(rememberMeId);
            expect(activityDetails.getParentRememberMeId()).to.equal(parentRememberMeId);
            expect(outcome).to.equal('SUCCESS');

            done();
          })
          .catch(done);
      });
    });

    context('when the response does not have profile attributes', () => {
      const responseContentNonExistent = fs.readFileSync('./tests/sample-data/payloads/payload-other-party-non-existent.json', 'utf8');

      beforeEach((done) => {
        nock(`${config.yoti.connectApi}`)
          .get(new RegExp('^/api/v1/profile/'))
          .reply(200, responseContentNonExistent);
        done();
      });

      it('should fetch and decrypt the empty profile', (done) => {
        yotiClient.getActivityDetails(encryptedYotiToken)
          .then((activityDetails) => {
            const profile = activityDetails.getUserProfile();
            const outcome = activityDetails.getOutcome();

            expect(profile).to.not.equal(undefined);
            expect(profile).to.deep.equal({});
            expect(activityDetails.getRememberMeId()).to.equal(rememberMeId);
            expect(activityDetails.getParentRememberMeId()).to.equal(parentRememberMeId);
            expect(outcome).to.equal('SUCCESS');

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
        .post(new RegExp('^/api/v1/aml-check?'), amlPayload.getPayloadJSON())
        .reply(200, amlCheckResult);

      done();
    });

    it('should return a successful result', (done) => {
      yotiClient.performAmlCheck(amlProfile)
        .then((amlResult) => {
          expect(amlResult.isOnPepList).to.equal(true);
          expect(amlResult.isOnFraudList).to.equal(false);
          expect(amlResult.isOnWatchList).to.equal(false);

          done();
        })
        .catch(done);
    });
  });
});
