const nock = require('nock');
const fs = require('fs');
const yotiRequestHandler = require('../../src/request/request.handler');
const { RequestBuilder } = require('../../src/request/request.builder');
const { Payload } = require('../../src/request/payload');

const SOME_BASE_URL = 'https://someapi.yoti.com';
const SOME_ENDPOINT = '/some/endpoint';
const SOME_ENDPOINT_REG_EXP = new RegExp(`^${SOME_ENDPOINT}`);
const SOME_PEM_STRING = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');
const ALLOWED_METHODS = ['POST', 'PUT', 'PATCH', 'GET', 'DELETE'];
const SOME_JSON_DATA = { some: 'json' };
const SOME_JSON_DATA_STRING = JSON.stringify(SOME_JSON_DATA);
const SOME_JSON_RECEIPT_DATA = { receipt: 'some receipt' };
const SOME_JSON_RECEIPT_DATA_STRING = JSON.stringify(SOME_JSON_RECEIPT_DATA);
const SOME_DATA = 'someData';

/**
 * @param {string} method
 * @param {string} uri
 * @param {integer} responseCode
 * @param {string} body
 */
const mockResponse = (method, uri, responseCode, body) => {
  const scope = nock(SOME_BASE_URL);
  const interceptor = scope[method.toLowerCase()](uri);
  interceptor.reply(responseCode, body, {
    'content-type': 'application/json',
  });
};

describe('yotiRequest', () => {
  afterEach((done) => {
    nock.cleanAll();
    done();
  });

  ALLOWED_METHODS.forEach((ALLOWED_METHOD) => {
    describe(`when empty response is returned for ${ALLOWED_METHOD} method`, () => {
      beforeEach((done) => {
        mockResponse(ALLOWED_METHOD, SOME_ENDPOINT_REG_EXP, 200, '');
        done();
      });

      it('should return YotiResponse', (done) => {
        const request = new RequestBuilder()
          .withBaseUrl(SOME_BASE_URL)
          .withEndpoint(SOME_ENDPOINT)
          .withMethod(ALLOWED_METHOD)
          .withPayload(new Payload(''))
          .withPemString(SOME_PEM_STRING)
          .build();

        yotiRequestHandler
          .execute(request)
          .then((response) => {
            expect(response.getParsedResponse()).toBeNull();
            done();
          })
          .catch(done);
      });
    });
    describe(`when JSON response is returned for ${ALLOWED_METHOD} method`, () => {
      beforeEach((done) => {
        mockResponse(ALLOWED_METHOD, SOME_ENDPOINT_REG_EXP, 200, SOME_JSON_DATA_STRING);
        done();
      });

      it('should return YotiResponse', (done) => {
        const request = new RequestBuilder()
          .withBaseUrl(SOME_BASE_URL)
          .withEndpoint(SOME_ENDPOINT)
          .withMethod(ALLOWED_METHOD)
          .withPayload(new Payload(''))
          .withPemString(SOME_PEM_STRING)
          .build();

        yotiRequestHandler
          .execute(request)
          .then((response) => {
            expect(response.getParsedResponse())
              .toStrictEqual(SOME_JSON_DATA);
            expect(response.getReceipt())
              .toBeNull();
            done();
          })
          .catch(done);
      });
    });
  });
  describe('when receipt is returned', () => {
    beforeEach((done) => {
      mockResponse('GET', SOME_ENDPOINT_REG_EXP, 200, SOME_JSON_RECEIPT_DATA_STRING);
      done();
    });

    it('should return YotiResponse', (done) => {
      const request = new RequestBuilder()
        .withBaseUrl(SOME_BASE_URL)
        .withEndpoint(SOME_ENDPOINT)
        .withMethod('GET')
        .withPemString(SOME_PEM_STRING)
        .build();

      yotiRequestHandler
        .execute(request)
        .then((response) => {
          expect(response.getParsedResponse())
            .toStrictEqual(SOME_JSON_RECEIPT_DATA);
          expect(response.getReceipt())
            .toStrictEqual(SOME_JSON_RECEIPT_DATA.receipt);
          done();
        })
        .catch(done);
    });
  });
  [
    'application/octet-stream',
    'image/jpeg',
    'image/png',
  ].forEach((mimeType) => {
    describe(`when ${mimeType} content is returned`, () => {
      beforeEach((done) => {
        nock(SOME_BASE_URL)
          .get(SOME_ENDPOINT_REG_EXP)
          .reply(200, SOME_DATA, {
            'Content-Type': mimeType,
          });
        done();
      });
      it('should return YotiResponse', (done) => {
        const request = new RequestBuilder()
          .withBaseUrl(SOME_BASE_URL)
          .withEndpoint(SOME_ENDPOINT)
          .withMethod('GET')
          .withPemString(SOME_PEM_STRING)
          .build();

        yotiRequestHandler
          .execute(request, true)
          .then((response) => {
            expect(response.getParsedResponse())
              .toBeInstanceOf(Buffer);
            expect(response.getParsedResponse().toString())
              .toBe(SOME_DATA);
            done();
          })
          .catch(done);
      });
    });
  });
});
