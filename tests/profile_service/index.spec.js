const nock = require('nock');
const fs = require('fs');

const config = require('../../config');
const { ProfileService, getReceipt } = require('../../src/profile_service');

const privateKeyFile = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');

describe('profileService', () => {
  const rememberMeId = 'Hig2yAT79cWvseSuXcIuCLa5lNkAPy70rxetUaeHlTJGmiwc/g1MWdYWYrexWvPU';
  const parentRememberMeId = 'f5RjVQMyoKOvO/hkv43Ik+t6d6mGfP2tdrNijH4k4qafTG0FSNUgQIvd2Z3Nx1j8';
  const receiptId = '9HNJDX5bEIN5TqBm0OGzVIc1LaAmbzfx6eIrwNdwpHvKeQmgPujyogC+r7hJCVPl';

  afterEach((done) => {
    nock.cleanAll();
    done();
  });

  describe('#getReceipt', () => {
    describe('when the profile has attributes', () => {
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
        getReceipt('a-test-token', privateKeyFile, 'stub-app-id')
          .then((receipt) => {
            expect(receipt.getReceiptId()).toBe(receiptId);
            expect(receipt.getRememberMeId()).toBe(rememberMeId);
            expect(receipt.getParentRememberMeId()).toBe(parentRememberMeId);
            expect(receipt.getTimestamp()).toBeInstanceOf(Date);
            expect(receipt.getTimestamp().toUTCString()).toBe('Tue, 19 Jul 2016 08:55:38 GMT');

            const outcome = receipt.getOutcome();
            expect(outcome).toBe('SUCCESS');

            const profile = receipt.getProfile();
            expect(profile).toBeDefined();
            expect(profile.getPhoneNumber().getValue()).toBe(phoneNumber);
            expect(profile.getSelfie().getValue().getBase64Content()).toBe(selfie);
            done();
          })
          .catch(done);
      });
    });

    describe('when the profile is empty', () => {
      const responseContentNull = fs.readFileSync('./tests/sample-data/payloads/payload-other-party-null.json', 'utf8');

      beforeEach((done) => {
        nock(`${config.yoti.connectApi}`)
          .get(new RegExp('^/api/v1/profile/'))
          .reply(200, responseContentNull);
        done();
      });

      it('should get an empty receipt from an empty profile share', (done) => {
        getReceipt('a-test-token', privateKeyFile, 'stub-app-id')
          .then((receipt) => {
            expect(receipt.getReceiptId()).toBe(receiptId);
            expect(receipt.getRememberMeId()).toBe(rememberMeId);
            expect(receipt.getParentRememberMeId()).toBe(parentRememberMeId);

            const outcome = receipt.getOutcome();
            expect(outcome).toBe('SUCCESS');

            const profile = receipt.getProfile();
            expect(profile).toBeDefined();
            expect(profile.getAttributesList()).toEqual([]);

            done();
          })
          .catch(done);
      });
    });

    describe('when the profile contains an empty object', () => {
      const responseContentEmptyObj = fs.readFileSync('./tests/sample-data/payloads/payload-other-party-empty-object.json', 'utf8');

      beforeEach((done) => {
        nock(`${config.yoti.connectApi}`)
          .get(new RegExp('^/api/v1/profile/'))
          .reply(200, responseContentEmptyObj);
        done();
      });

      it('should get an empty receipt from an empty profile share', (done) => {
        getReceipt('a-test-token', privateKeyFile, 'stub-app-id')
          .then((receipt) => {
            expect(receipt.getReceiptId()).toBe(receiptId);
            expect(receipt.getRememberMeId()).toBe(rememberMeId);
            expect(receipt.getParentRememberMeId()).toBe(parentRememberMeId);

            const outcome = receipt.getOutcome();
            expect(outcome).toBe('SUCCESS');

            const profile = receipt.getProfile();
            expect(profile).toBeDefined();
            expect(profile.getAttributesList()).toEqual([]);

            done();
          })
          .catch(done);
      });
    });

    describe('when the response does not have profile attributes', () => {
      const responseContentNonExistent = fs.readFileSync('./tests/sample-data/payloads/payload-other-party-non-existent.json', 'utf8');

      beforeEach((done) => {
        nock(`${config.yoti.connectApi}`)
          .get(new RegExp('^/api/v1/profile/'))
          .reply(200, responseContentNonExistent);
        done();
      });

      it('should get an empty receipt from an empty profile share', (done) => {
        getReceipt('a-test-token', privateKeyFile, 'stub-app-id')
          .then((receipt) => {
            expect(receipt.getReceiptId()).toBe(receiptId);
            expect(receipt.getRememberMeId()).toBe(rememberMeId);
            expect(receipt.getParentRememberMeId()).toBe(parentRememberMeId);

            const outcome = receipt.getOutcome();
            expect(outcome).toBe('SUCCESS');

            const profile = receipt.getProfile();
            expect(profile).toBeDefined();
            expect(profile.getAttributesList()).toEqual([]);

            done();
          })
          .catch(done);
      });
    });
  });

  describe('ProfileService class', () => {
    const apiUrlDomain = 'https://some.api.com';
    const apiUrlPath = '/api/v1';
    const apiUrl = apiUrlDomain + apiUrlPath;

    let profileService;

    beforeAll(() => {
      profileService = new ProfileService('stub-app-id', privateKeyFile, { apiUrl });
    });

    const setupResponse = (response) => {
      nock(apiUrlDomain)
        .get(new RegExp(`${apiUrlPath}/profile`))
        .reply(200, response);
    };

    describe('#getReceipt', () => {
      describe('when the profile has attributes', () => {
        const selfie = fs.readFileSync('./tests/sample-data/fixtures/selfie.txt', 'utf8');
        const phoneNumber = '+447474747474';

        beforeEach(() => {
          const response = fs.readFileSync('./tests/sample-data/payloads/payload.json', 'utf8');
          setupResponse(response);
        });

        it('should get the receipt', (done) => {
          profileService.getReceipt('a-test-token', privateKeyFile, 'stub-app-id')
            .then((receipt) => {
              expect(receipt.getReceiptId()).toBe(receiptId);
              expect(receipt.getRememberMeId()).toBe(rememberMeId);
              expect(receipt.getParentRememberMeId()).toBe(parentRememberMeId);
              expect(receipt.getTimestamp()).toBeInstanceOf(Date);
              expect(receipt.getTimestamp().toUTCString()).toBe('Tue, 19 Jul 2016 08:55:38 GMT');

              const outcome = receipt.getOutcome();
              expect(outcome).toBe('SUCCESS');

              const profile = receipt.getProfile();
              expect(profile).toBeDefined();
              expect(profile.getPhoneNumber().getValue()).toBe(phoneNumber);
              expect(profile.getSelfie().getValue().getBase64Content()).toBe(selfie);

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

        it('should get an empty receipt from an empty profile share', (done) => {
          profileService.getReceipt('a-test-token', privateKeyFile, 'stub-app-id')
            .then((receipt) => {
              expect(receipt.getReceiptId()).toBe(receiptId);
              expect(receipt.getRememberMeId()).toBe(rememberMeId);
              expect(receipt.getParentRememberMeId()).toBe(parentRememberMeId);

              const outcome = receipt.getOutcome();
              expect(outcome).toBe('SUCCESS');

              const profile = receipt.getProfile();
              expect(profile).toBeDefined();
              expect(profile.getAttributesList()).toEqual([]);

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

        it('should get an empty receipt from an empty profile share', (done) => {
          profileService.getReceipt('a-test-token', privateKeyFile, 'stub-app-id')
            .then((receipt) => {
              expect(receipt.getReceiptId()).toBe(receiptId);
              expect(receipt.getRememberMeId()).toBe(rememberMeId);
              expect(receipt.getParentRememberMeId()).toBe(parentRememberMeId);

              const outcome = receipt.getOutcome();
              expect(outcome).toBe('SUCCESS');

              const profile = receipt.getProfile();
              expect(profile).toBeDefined();
              expect(profile.getAttributesList()).toEqual([]);

              done();
            })
            .catch(done);
        });
      });

      describe('when the response does not have profile attributes', () => {
        const responseContentNonExistent = fs.readFileSync('./tests/sample-data/payloads/payload-other-party-non-existent.json', 'utf8');

        beforeEach(() => {
          setupResponse(responseContentNonExistent);
        });

        it('should get an empty receipt from an empty profile share', (done) => {
          profileService.getReceipt('a-test-token', privateKeyFile, 'stub-app-id')
            .then((receipt) => {
              expect(receipt.getReceiptId()).toBe(receiptId);
              expect(receipt.getRememberMeId()).toBe(rememberMeId);
              expect(receipt.getParentRememberMeId()).toBe(parentRememberMeId);

              const outcome = receipt.getOutcome();
              expect(outcome).toBe('SUCCESS');

              const profile = receipt.getProfile();
              expect(profile).toBeDefined();
              expect(profile.getAttributesList()).toEqual([]);

              done();
            })
            .catch(done);
        });
      });
    });
  });
});
