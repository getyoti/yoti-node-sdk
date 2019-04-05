const expect = require('chai').expect;
const nock = require('nock');
const fs = require('fs');

const config = require('../config');
const request = require('../src/request');

const AmlAddress = require('../src/aml_type').AmlAddress;
const AmlProfile = require('../src/aml_type').AmlProfile;
const Payload = require('../src/request/payload').Payload;

const privateKeyFile = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');

const yotiPackage = require('../package.json');

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

    context('when making an API request', () => {
      const expectedHeaders = {
        'X-Yoti-SDK': 'Node',
        'X-Yoti-SDK-Version': `Node-${yotiPackage.version}`,
        'X-Yoti-Auth-Key': new RegExp('^[a-zA-Z0-9/+]{392}$'),
        'X-Yoti-Auth-Digest': new RegExp('^[a-zA-Z0-9/+=]{344}$'),
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
      Object.keys(expectedHeaders).forEach((header) => {
        beforeEach((done) => {
          const apiUri = new RegExp(`^/api/v1/${header}/stub?`);

          // Return success result when correct headers are provided.
          nock(`${config.yoti.connectApi}`)
            .matchHeader(header, expectedHeaders[header])
            .get(apiUri)
            .reply(200, { result: 'correct header' });

          // Return failure result if the header isn't matched.
          nock(`${config.yoti.connectApi}`)
            .get(apiUri)
            .reply(200, { result: 'incorrect header' });

          done();
        });

        it(`should have the correct ${header} header`, (done) => {
          request.makeRequest('GET', `/${header}/stub`, privateKeyFile, 'stub-app-id', new Payload(''))
            .then((response) => {
              expect(response.parsedResponse.result).to.equal('correct header');
              done();
            })
            .catch(done);
        });
      });
    });
  });
});
