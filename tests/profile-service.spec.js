const expect = require('chai').expect;
const nock = require('nock');
const fs = require('fs');

const config = require('../config');
const profileService = require('../src/profile_service');

const privateKeyFile = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');

describe('profileService', () => {
  afterEach((done) => {
    nock.cleanAll();
    done();
  });

  describe('#getReceipt', () => {
    const userId = 'Hig2yAT79cWvseSuXcIuCLa5lNkAPy70rxetUaeHlTJGmiwc/g1MWdYWYrexWvPU';
    const parentRememberMeId = 'f5RjVQMyoKOvO/hkv43Ik+t6d6mGfP2tdrNijH4k4qafTG0FSNUgQIvd2Z3Nx1j8';

    context('when the profile has attributes', () => {
      const response = fs.readFileSync('./tests/sample-data/payloads/payload.json', 'utf8');

      const selfie = fs.readFileSync('./tests/sample-data/fixtures/selfie.txt', 'utf8');
      const phoneNumber = '+447474747474';

      beforeEach((done) => {
        nock(`${config.yoti.connectApi}`)
          .get(new RegExp('^/api/v1/profile/'))
          .reply(200, response);
        done();
      });

      it('should get the receipt', (done) => {
        profileService.getReceipt('blah', privateKeyFile, 'stub-app-id')
          .then((receipt) => {
            const profile = receipt.getUserProfile();
            const outcome = receipt.getOutcome();

            expect(profile).to.not.equal(undefined);
            expect(receipt.getUserId()).to.equal(userId);
            expect(receipt.getParentRememberMeId()).to.equal(parentRememberMeId);
            expect(profile.phoneNumber).to.equal(phoneNumber);
            expect(`data:image/jpeg;base64,${profile.selfie.toBase64()}`).to.equal(selfie);
            expect(receipt.getBase64SelfieUri()).to.equal(selfie);
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

      it('should get an empty receipt from an empty profile share', (done) => {
        profileService.getReceipt('blah', privateKeyFile, 'stub-app-id')
          .then((receipt) => {
            const profile = receipt.getUserProfile();
            const outcome = receipt.getOutcome();

            expect(profile).to.not.equal(undefined);
            expect(profile).to.deep.equal({});
            expect(receipt.getUserId()).to.equal(userId);
            expect(receipt.getParentRememberMeId()).to.equal(parentRememberMeId);
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

      it('should get an empty receipt from an empty profile share', (done) => {
        profileService.getReceipt('blah', privateKeyFile, 'stub-app-id')
          .then((receipt) => {
            const profile = receipt.getUserProfile();
            const outcome = receipt.getOutcome();

            expect(profile).to.not.equal(undefined);
            expect(profile).to.deep.equal({});
            expect(receipt.getUserId()).to.equal(userId);
            expect(receipt.getParentRememberMeId()).to.equal(parentRememberMeId);
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

      it('should get an empty receipt from an empty profile share', (done) => {
        profileService.getReceipt('blah', privateKeyFile, 'stub-app-id')
          .then((receipt) => {
            const profile = receipt.getUserProfile();
            const outcome = receipt.getOutcome();

            expect(profile).to.not.equal(undefined);
            expect(profile).to.deep.equal({});
            expect(receipt.getUserId()).to.equal(userId);
            expect(receipt.getParentRememberMeId()).to.equal(parentRememberMeId);
            expect(outcome).to.equal('SUCCESS');

            done();
          })
          .catch(done);
      });
    });
  });
});
