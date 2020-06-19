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
const SOME_HEADERS = { 'Some-Header': 'some value' };
const SOME_JSON_DATA_STRING = JSON.stringify(SOME_JSON_DATA);
const SOME_JSON_RECEIPT_DATA = { receipt: 'some receipt' };
const SOME_JSON_RECEIPT_DATA_STRING = JSON.stringify(SOME_JSON_RECEIPT_DATA);
const SOME_DATA = 'someData';
const SOME_REQUEST = new RequestBuilder()
  .withBaseUrl(SOME_BASE_URL)
  .withEndpoint(SOME_ENDPOINT)
  .withMethod('GET')
  .withPemString(SOME_PEM_STRING)
  .build();

/**
 * @param {string} method
 * @param {string} uri
 * @param {integer} responseCode
 * @param {string} body
 */
const mockResponse = (method, uri, responseCode, body, headers) => {
  const scope = nock(SOME_BASE_URL);
  const interceptor = scope[method.toLowerCase()](uri);
  interceptor.reply(responseCode, body, headers);
};

describe('yotiRequest', () => {
  afterEach((done) => {
    nock.cleanAll();
    done();
  });

  ALLOWED_METHODS.forEach((ALLOWED_METHOD) => {
    describe(`when empty response is returned for ${ALLOWED_METHOD} method`, () => {
      beforeEach((done) => {
        mockResponse(ALLOWED_METHOD, SOME_ENDPOINT_REG_EXP, 200, '', {
          'content-type': 'application/json',
        });
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
            expect(response.getBody()).toBeNull();
            expect(response.getStatusCode()).toBe(200);
            done();
          })
          .catch(done);
      });
    });
    describe(`when JSON response is returned for ${ALLOWED_METHOD} method`, () => {
      beforeEach((done) => {
        mockResponse(ALLOWED_METHOD, SOME_ENDPOINT_REG_EXP, 200, SOME_JSON_DATA_STRING, {
          'content-type': 'application/json',
        });
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
            expect(response.getParsedResponse()).toStrictEqual(SOME_JSON_DATA);
            expect(response.getBody()).toBe(SOME_JSON_DATA_STRING);
            expect(response.getReceipt()).toBeNull();
            expect(response.getStatusCode()).toBe(200);
            done();
          })
          .catch(done);
      });
    });
  });
  describe('when receipt is returned', () => {
    beforeEach((done) => {
      nock(SOME_BASE_URL)
        .get(SOME_ENDPOINT_REG_EXP)
        .reply(200, SOME_JSON_RECEIPT_DATA_STRING, {
          'content-type': 'application/json',
        });
      done();
    });

    it('should return YotiResponse', (done) => {
      yotiRequestHandler
        .execute(SOME_REQUEST)
        .then((response) => {
          expect(response.getParsedResponse()).toStrictEqual(SOME_JSON_RECEIPT_DATA);
          expect(response.getBody()).toBe(SOME_JSON_RECEIPT_DATA_STRING);
          expect(response.getReceipt()).toStrictEqual(SOME_JSON_RECEIPT_DATA.receipt);
          expect(response.getStatusCode()).toBe(200);
          done();
        })
        .catch(done);
    });
  });
  describe('when headers are returned', () => {
    beforeEach((done) => {
      nock(SOME_BASE_URL)
        .get(SOME_ENDPOINT_REG_EXP)
        .reply(200, SOME_JSON_DATA_STRING, SOME_HEADERS);
      done();
    });
    it('should return YotiResponse with headers', (done) => {
      yotiRequestHandler
        .execute(SOME_REQUEST, true)
        .then((response) => {
          expect(response).toHaveHeaders(SOME_HEADERS);
          done();
        })
        .catch(done);
    });
  });
  [
    'application/octet-stream',
    'application/pdf',
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
        yotiRequestHandler
          .execute(SOME_REQUEST, true)
          .then((response) => {
            expect(response.getParsedResponse()).toBeInstanceOf(Buffer);
            expect(response.getParsedResponse().toString()).toBe(SOME_DATA);
            expect(response.getBody().toString()).toBe(SOME_DATA);
            expect(response.getStatusCode()).toBe(200);
            done();
          })
          .catch(done);
      });
    });
  });
  [
    'text/plain',
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
        yotiRequestHandler
          .execute(SOME_REQUEST)
          .then((response) => {
            expect(response.getBody()).toBe(SOME_DATA);
            done();
          })
          .catch(done);
      });
    });
  });
});

expect.extend({
  toHaveHeaders(response, expectedHeaders) {
    Object.keys(expectedHeaders).forEach((header) => {
      // Note: Response header names are lowercased by superagent.
      const headerValue = response.getHeaders()[header.toLowerCase()];
      const expectedHeaderValue = expectedHeaders[header];

      expect(headerValue).toBe(expectedHeaderValue);
    });
    return {
      message: () => 'Response contains expected headers',
      pass: true,
    };
  },
});
