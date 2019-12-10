const nock = require('nock');
const fs = require('fs');

const config = require('../../config');
const amlService = require('../../src/aml_service');
const AmlAddress = require('../../src/aml_type').AmlAddress;
const AmlProfile = require('../../src/aml_type').AmlProfile;
const Payload = require('../../src/request/payload').Payload;

const privateKeyFile = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');

describe('amlService', () => {
  const amlAddress = new AmlAddress('GBR');
  const amlProfile = new AmlProfile('Edward Richard George', 'Heath', amlAddress);
  const amlPayload = new Payload(amlProfile.getData());

  describe('#performAmlCheck', () => {
    afterEach((done) => {
      nock.cleanAll();
      done();
    });

    describe('with a valid profile', () => {
      const amlCheckResult = fs.readFileSync('./tests/sample-data/responses/aml-check-result.json', 'utf8');

      beforeEach((done) => {
        nock(`${config.yoti.connectApi}`)
          .post(new RegExp('^/api/v1/aml-check?'), amlPayload.getPayloadJSON())
          .reply(200, amlCheckResult);
        done();
      });

      it('should return a successful result from performAmlCheck call', (done) => {
        amlService.performAmlCheck(amlProfile, privateKeyFile, 'stub-app-id')
          .then((amlResult) => {
            expect(amlResult.isOnPepList).toBe(true);
            expect(amlResult.isOnFraudList).toBe(false);
            expect(amlResult.isOnWatchList).toBe(false);

            const expectedData = {
              on_pep_list: true,
              on_fraud_list: false,
              on_watch_list: false,
            };

            const data = amlResult.getData();

            expect(data.on_pep_list).toBe(expectedData.on_pep_list);
            expect(data.on_fraud_list).toBe(expectedData.on_fraud_list);
            expect(data.on_watch_list).toBe(expectedData.on_watch_list);

            expect(amlResult.toString()).toStrictEqual(JSON.stringify(expectedData));

            done();
          })
          .catch(done);
      });
    });

    describe('with an invalid profile response', () => {
      const amlCheckError = fs.readFileSync('./tests/sample-data/responses/aml-check-error.json', 'utf8');
      const expectedErrorMessage = 'PAYLOAD_VALIDATION - There were errors validating the payload: [{"property":"address.country","message":"country must be specified as an ISO-3166 3-letter code"}]';

      beforeEach((done) => {
        nock(`${config.yoti.connectApi}`)
          .post(new RegExp('^/api/v1/aml-check?'), amlPayload.getPayloadJSON())
          .reply(400, amlCheckError);

        done();
      });

      it('should return PAYLOAD_VALIDATION error', (done) => {
        amlService.performAmlCheck(amlProfile, privateKeyFile, 'stub-app-id')
          .catch((err) => {
            expect(err.message).toBe(expectedErrorMessage);
            done();
          })
          .catch(done);
      });
    });

    describe('with an invalid JSON response', () => {
      beforeEach((done) => {
        nock(`${config.yoti.connectApi}`)
          .post(new RegExp('^/api/v1/aml-check?'), amlPayload.getPayloadJSON())
          .reply(200, '');

        done();
      });

      it('should return response data error', (done) => {
        amlService.performAmlCheck(amlProfile, privateKeyFile, 'stub-app-id')
          .catch((err) => {
            expect(err.message).toBe('Result Data should be an object');
            done();
          })
          .catch(done);
      });
    });

    describe('with an empty profile', () => {
      it('should throw validation error', () => {
        expect(() => amlService.performAmlCheck('', privateKeyFile, 'stub-app-id'))
          .toThrow(new Error('Error - AmlProfile should be an object of Type/AmlProfile'));
      });
    });
  });
});
