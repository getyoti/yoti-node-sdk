const expect = require('chai').expect;
const nock = require('nock');
const fs = require('fs');

const { SignedRequest } = require('../../src/request/signed.request');
const { RequestBuilder } = require('../../src/request/request.builder');

const PEM_FILE_PATH = './tests/sample-data/keys/node-sdk-test.pem';
const PEM_STRING = fs.readFileSync(PEM_FILE_PATH, 'utf8');
const API_BASE_URL = 'https://api.example.com';
const API_ENDPOINT = '/some-endpoint';

/**
 * Assert that the signed request was built correctly.
 *
 * @param {SignedRequest} signedRequest
 */
const assertExpectedSignedRequest = async (signedRequest) => {
  expect(signedRequest).to.be.instanceOf(SignedRequest);

  // Check that auth headers are present.
  const response = await signedRequest.get(API_ENDPOINT);
  const headers = response.getParsedResponse().headers;
  expect(headers['x-yoti-auth-key']).to.not.equal(null);
  expect(headers['x-yoti-auth-digest']).to.not.equal(null);
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

    it('should build a SignedRequest with pem string', () => {
      const signedRequest = new RequestBuilder()
        .withBaseUrl(API_BASE_URL)
        .withPemString(PEM_STRING)
        .build();

      assertExpectedSignedRequest(signedRequest);
    });

    it('should build a SignedRequest with pem file path', () => {
      const signedRequest = new RequestBuilder()
        .withBaseUrl(API_BASE_URL)
        .withPemFilePath(PEM_FILE_PATH)
        .build();

      assertExpectedSignedRequest(signedRequest);
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
  });
});
