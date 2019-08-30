const expect = require('chai').expect;
const nock = require('nock');
const fs = require('fs');

const { Request } = require('../../src/request/request');
const { Payload } = require('../../src/request/payload');

const yotiPackage = require('../../package.json');

const PEM_STRING = fs.readFileSync('./tests/sample-data/keys/node-sdk-test.pem', 'utf8');

const API_BASE_URL = 'https://api.example.com';
const API_ENDPOINT = '/test-headers';

/**
 * Assert that the sent headers are correct.
 *
 * @param {YotiResponse} response
 */
const assertCorrectHeaders = (response, done) => {
  const sentHeaders = response.getParsedResponse().headers;

  const expectedHeaders = {
    'X-Yoti-SDK': 'Node',
    'X-Yoti-SDK-Version': `Node-${yotiPackage.version}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  Object.keys(expectedHeaders).forEach((header) => {
    const sentHeader = sentHeaders[header.toLowerCase()];
    expect(sentHeader).to.equal(expectedHeaders[header], header);
  });

  const expectedMatchHeaders = {
    'X-Yoti-Auth-Key': new RegExp('^[a-zA-Z0-9/+]{392}$'),
    'X-Yoti-Auth-Digest': new RegExp('^[a-zA-Z0-9/+=]{344}$'),
  };

  Object.keys(expectedMatchHeaders).forEach((header) => {
    const sentHeader = sentHeaders[header.toLowerCase()];
    expect(sentHeader).to.match(expectedMatchHeaders[header], header);
  });

  done();
};

/**
 * Callback to return the request headers.
 *
 * @returns {Object.<string, string>}
 */
function requestDetails() {
  return { headers: this.req.headers };
}

describe('Request', () => {
  beforeEach((done) => {
    nock(API_BASE_URL)
      .get(new RegExp(`^${API_ENDPOINT}?`))
      .reply(requestDetails);

    nock(API_BASE_URL)
      .post(new RegExp(`^${API_ENDPOINT}?`))
      .reply(requestDetails);

    done();
  });
  describe('#sendRequest', () => {
    context('when making a GET API request', () => {
      it('should have the correct request headers', (done) => {
        const request = new Request(API_BASE_URL, PEM_STRING);
        request
          .sendRequest(API_ENDPOINT, 'GET', new Payload(''))
          .then(response => assertCorrectHeaders(response, done))
          .catch(done);
      });
    });
    context('when making a POST API request', () => {
      it('should have the correct request headers', (done) => {
        const request = new Request(API_BASE_URL, PEM_STRING);
        request
          .sendRequest(API_ENDPOINT, 'POST', new Payload(''))
          .then(response => assertCorrectHeaders(response, done))
          .catch(done);
      });
    });
  });
  describe('#setHeaders', () => {
    context('when making an API request with custom headers', () => {
      it('should have the custom request headers', (done) => {
        const request = new Request(API_BASE_URL, PEM_STRING);
        const CUSTOM_HEADERS = {
          'Custom-1': 'value 1',
          'Custom-2': 'value 2',
        };
        request.setHeaders(CUSTOM_HEADERS);
        request
          .sendRequest(API_ENDPOINT, 'GET', new Payload(''))
          .then((response) => {
            assertCorrectHeaders(response, done);
            const sentHeaders = response.getParsedResponse().headers;
            Object.keys(CUSTOM_HEADERS).forEach((header) => {
              const sentHeader = sentHeaders[header.toLowerCase()];
              const customHeader = CUSTOM_HEADERS[header];
              expect(sentHeader).to.equal(customHeader, header);
            });
          })
          .catch(done);
      });
    });
    context('when building the request', () => {
      it('should only accept string header values', () => {
        expect(() => {
          new Request(API_BASE_URL, PEM_STRING)
            .setHeaders({
              'Custom-1': ['invalid value'],
            });
        }).to.throw(TypeError, "'Custom-1' header must be a string");
      });
    });
  });
  describe('#post', () => {
    context('when making an API request', () => {
      it('should have the correct request headers', (done) => {
        const request = new Request(API_BASE_URL, PEM_STRING);
        request
          .post(API_ENDPOINT, new Payload(''))
          .then(response => assertCorrectHeaders(response, done))
          .catch(done);
      });
    });
  });
  describe('#get', () => {
    context('when making an API request', () => {
      it('should have the correct request headers', (done) => {
        const request = new Request(API_BASE_URL, PEM_STRING);
        request
          .get(API_ENDPOINT)
          .then(response => assertCorrectHeaders(response, done))
          .catch(done);
      });
    });
  });
  describe('constructor', () => {
    it('should require a PEM string', () => {
      expect(() => new Request(API_BASE_URL)).to.throw(TypeError, 'pem cannot be null');
    });

    it('should require a base url', () => {
      expect(() => new Request(null, PEM_STRING)).to.throw(TypeError, 'apiUrl must be a string');
    });
  });
});
