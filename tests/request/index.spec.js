const expect = require('chai').expect;
const nock = require('nock');
const fs = require('fs');

const config = require('../../config');
const request = require('../../src/request');
const { Payload } = require('../../src/request/payload');

const PEM_STRING = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');

const expectedPayload = new Payload({ some: 'payload' });

/**
 * Mock the Connect API.
 */
const mockConnectApi = () => {
  beforeEach((done) => {
    nock(`${config.yoti.connectApi}`)
      .post(new RegExp('^/api/v1/some-endpoint?'), expectedPayload.getPayloadJSON())
      .reply(200, {});
    done();
  });
};

describe('request', () => {
  describe('#buildConnectApiRequest', () => {
    context('when making a Connect API request', () => {
      mockConnectApi();

      it('should make a successful POST request to the endpoint', (done) => {
        const connectApi = request.buildConnectApiRequest(PEM_STRING);
        connectApi.post('/some-endpoint', expectedPayload, { appId: 'stub-app-id' })
          .then((response) => {
            expect(response.getParsedResponse()).to.be.a('object');
            done();
          })
          .catch(done);
      });
    });
  });

  describe('#makeRequest', () => {
    context('when making a Connect API request', () => {
      mockConnectApi();

      it('should make a successful POST request to the endpoint', (done) => {
        request.makeRequest('POST', '/some-endpoint', PEM_STRING, 'stub-app-id', expectedPayload)
          .then((response) => {
            expect(response.getParsedResponse()).to.be.a('object');
            done();
          })
          .catch(done);
      });
    });
  });
});
