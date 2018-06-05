const expect = require('chai').expect;
const nock = require('nock');
const fs = require('fs');

const config = require('../config');
const request = require('../src/request');

const AmlAddress = require('../src/aml_type').AmlAddress;
const AmlProfile = require('../src/aml_type').AmlProfile;
const Payload = require('../src/request/payload').Payload;

const privateKeyFile = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');

describe('YotiResponse', () => {
  describe('#makeRequest', () => {
    const amlAddress = new AmlAddress('GBR');
    const amlProfile = new AmlProfile('Edward Richard George', 'Heath', amlAddress);
    const amlPayload = new Payload(amlProfile.getData());

    const amlCheckResult = fs.readFileSync('./tests/sample-data/responses/aml-check-result.json', 'utf8');

    context('when making an AML check request', () => {
      beforeEach((done) => {
        nock(`${config.yoti.connectApi}`)
          .post(new RegExp('^/api/v1/aml-check?'), amlPayload.getPayloadJSON())
          .reply(200, amlCheckResult);
        done();
      });

      it('should make a successful POST request to aml-check endpoint', (done) => {
        request.makeRequest('POST', '/aml-check', privateKeyFile, 'stub-app-id', amlPayload)
          .then((response) => {
            expect(response.parsedResponse).to.be.a('object');

            done();
          })
          .catch(done);
      });
    });
  });
});
