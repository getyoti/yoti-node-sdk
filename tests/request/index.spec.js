const nock = require('nock');
const fs = require('fs');

const config = require('../../config');
const yotiRequest = require('../../src/request');
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
    describe('when making a Connect API request', () => {
      mockConnectApi();

      it('should make a successful POST request to the endpoint', (done) => {
        const request = yotiRequest.buildConnectApiRequest(
          'POST',
          '/some-endpoint',
          PEM_STRING,
          'stub-app-id',
          expectedPayload
        );

        request.execute()
          .then((response) => {
            expect(response.getParsedResponse()).toBeInstanceOf(Object);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('#makeRequest', () => {
    describe('when making a Connect API request', () => {
      mockConnectApi();

      it('should make a successful POST request to the endpoint', (done) => {
        yotiRequest.makeRequest('POST', '/some-endpoint', PEM_STRING, 'stub-app-id', expectedPayload)
          .then((response) => {
            expect(response.getParsedResponse()).toBeInstanceOf(Object);
            done();
          })
          .catch(done);
      });
    });
  });
});
