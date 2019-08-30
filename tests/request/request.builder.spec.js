const expect = require('chai').expect;
const nock = require('nock');
const fs = require('fs');

const { Request } = require('../../src/request/request');
const { RequestBuilder } = require('../../');

const PEM_FILE_PATH = './tests/sample-data/keys/node-sdk-test.pem';
const PEM_STRING = fs.readFileSync(PEM_FILE_PATH, 'utf8');
const API_BASE_URL = 'https://api.example.com';
const API_ENDPOINT = '/some-endpoint';

/**
 * Assert that the signed request was built correctly.
 *
 * @param {Request} request
 */
const assertExpectedRequest = (request, done) => {
  expect(request).to.be.instanceOf(Request);

  // Check that auth headers are present.
  request
    .get(API_ENDPOINT)
    .then((response) => {
      const headers = response.getParsedResponse().headers;
      expect(headers['x-yoti-auth-key']).to.be.a('string');
      expect(headers['x-yoti-auth-digest']).to.be.a('string');
      expect(headers['x-yoti-sdk']).to.be.a('string');
      expect(headers['x-yoti-sdk-version']).to.be.a('string');
      done();
    })
    .catch(done);
};

describe('RequestBuilder', () => {
  describe('#build', () => {
    beforeEach((done) => {
      nock(API_BASE_URL)
        .get(new RegExp(`^${API_ENDPOINT}?`))
        .reply(function requestDetails() {
          return { headers: this.req.headers };
        });
      done();
    });

    it('should build a Request with pem string', (done) => {
      const request = new RequestBuilder()
        .withBaseUrl(API_BASE_URL)
        .withPemString(PEM_STRING)
        .build();

      assertExpectedRequest(request, done);
    });

    it('should build a Request with pem file path', (done) => {
      const request = new RequestBuilder()
        .withBaseUrl(API_BASE_URL)
        .withPemFilePath(PEM_FILE_PATH)
        .build();

      assertExpectedRequest(request, done);
    });

    it('should require a PEM string or file', () => {
      expect(() => {
        new RequestBuilder()
          .withBaseUrl(API_BASE_URL)
          .build();
      }).to.throw(Error, 'PEM file path or string must be provided');
    });

    it('should require a base url', () => {
      expect(() => {
        new RequestBuilder()
          .withPemFilePath(PEM_FILE_PATH)
          .build();
      }).to.throw(Error, 'Base URL must be specified');
    });

    it('should build with valid headers', (done) => {
      const request = new RequestBuilder()
        .withBaseUrl(API_BASE_URL)
        .withPemFilePath(PEM_FILE_PATH)
        .withHeader('Custom-1', 'value 1')
        .withHeader('Custom-2', 'value 2')
        .build();

      request
        .get(API_ENDPOINT)
        .then((response) => {
          const headers = response.getParsedResponse().headers;
          expect(headers['custom-1']).to.eql('value 1');
          expect(headers['custom-2']).to.eql('value 2');
          done();
        })
        .catch(done);
    });
  });
  describe('#withHeader', () => {
    it('should only accept string header value', () => {
      expect(() => {
        new RequestBuilder()
          .withBaseUrl(API_BASE_URL)
          .withPemFilePath(PEM_FILE_PATH)
          .withHeader('Custom-1', 'valid header')
          .withHeader('Custom-2', ['invalid header'])
          .build();
      }).to.throw(TypeError, "'Custom-2' header must be a string");
    });

    it('should only accept string header name', () => {
      expect(() => {
        new RequestBuilder()
          .withBaseUrl(API_BASE_URL)
          .withPemFilePath(PEM_FILE_PATH)
          .withHeader('Valid-Name', 'value')
          .withHeader(['Invalid-Name'], 'value')
          .build();
      }).to.throw(TypeError, 'Header name must be a string');
    });
  });
});
