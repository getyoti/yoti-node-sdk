const nock = require('nock');
const fs = require('fs');

const { YotiRequest } = require('../../src/request/request');
const { RequestBuilder } = require('../../');
const yotiPackage = require('../../package.json');

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
  expect(request).toBeInstanceOf(YotiRequest);

  // Check that auth headers are present.
  request.execute()
    .then((response) => {
      const sentHeaders = response.getParsedResponse().headers;

      const expectedHeaders = {
        'X-Yoti-SDK': 'Node',
        'X-Yoti-SDK-Version': `Node-${yotiPackage.version}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      Object.keys(expectedHeaders).forEach((header) => {
        const sentHeader = sentHeaders[header.toLowerCase()];
        expect(sentHeader).toBe(expectedHeaders[header], header);
      });

      const expectedMatchHeaders = {
        'X-Yoti-Auth-Key': new RegExp('^[a-zA-Z0-9/+]{392}$'),
        'X-Yoti-Auth-Digest': new RegExp('^[a-zA-Z0-9/+=]{344}$'),
      };

      Object.keys(expectedMatchHeaders).forEach((header) => {
        const sentHeader = sentHeaders[header.toLowerCase()];
        expect(sentHeader).toMatch(expectedMatchHeaders[header], header);
      });

      done();
    })
    .catch(done);
};

describe('RequestBuilder', () => {
  beforeEach((done) => {
    nock(API_BASE_URL)
      .get(new RegExp(`^${API_ENDPOINT}?`))
      .reply(function requestDetails() {
        return { headers: this.req.headers };
      });
    done();
  });
  describe('#build', () => {
    it('should build a Request with pem string', (done) => {
      const request = new RequestBuilder()
        .withBaseUrl(API_BASE_URL)
        .withPemString(PEM_STRING)
        .withEndpoint(API_ENDPOINT)
        .withGet()
        .build();

      assertExpectedRequest(request, done);
    });

    it('should build a Request with pem file path', (done) => {
      const request = new RequestBuilder()
        .withBaseUrl(API_BASE_URL)
        .withPemFilePath(PEM_FILE_PATH)
        .withEndpoint(API_ENDPOINT)
        .withGet()
        .build();

      assertExpectedRequest(request, done);
    });

    it('should require a PEM string or file', () => {
      expect(() => {
        new RequestBuilder()
          .withBaseUrl(API_BASE_URL)
          .build();
      }).toThrow(new Error('PEM file path or string must be provided'));
    });

    it('should require a base url', () => {
      expect(() => {
        new RequestBuilder()
          .withPemFilePath(PEM_FILE_PATH)
          .build();
      }).toThrow(new Error('Base URL must be specified'));
    });

    it('should build with valid headers', (done) => {
      const request = new RequestBuilder()
        .withBaseUrl(API_BASE_URL)
        .withPemFilePath(PEM_FILE_PATH)
        .withEndpoint(API_ENDPOINT)
        .withHeader('Custom-1', 'value 1')
        .withHeader('Custom-2', 'value 2')
        .withGet()
        .build();

      request
        .execute()
        .then((response) => {
          const headers = response.getParsedResponse().headers;
          expect(headers['custom-1']).toBe('value 1');
          expect(headers['custom-2']).toBe('value 2');
          done();
        })
        .catch(done);
    });
  });
  describe('#withEndpoint', () => {
    [
      `///${API_ENDPOINT}`,
      API_ENDPOINT.replace(/^\/+/, ''),
    ].forEach((endpoint) => {
      it(`should ensure "${endpoint}" has one leading slash`, (done) => {
        const request = new RequestBuilder()
          .withBaseUrl(`${API_BASE_URL}`)
          .withPemFilePath(PEM_FILE_PATH)
          .withEndpoint(endpoint)
          .withGet()
          .build();

        assertExpectedRequest(request, done);
      });
    });
  });
  describe('#withBaseUrl', () => {
    it('should remove trailing slashes', (done) => {
      const request = new RequestBuilder()
        .withBaseUrl(`${API_BASE_URL}///`)
        .withPemFilePath(PEM_FILE_PATH)
        .withEndpoint(API_ENDPOINT)
        .withGet()
        .build();

      assertExpectedRequest(request, done);
    });
  });
  describe('#withGet', () => {
    it('should set method to GET', () => {
      const request = new RequestBuilder()
        .withBaseUrl(API_BASE_URL)
        .withPemFilePath(PEM_FILE_PATH)
        .withEndpoint(API_ENDPOINT)
        .withGet()
        .build();

      expect(request.getMethod()).toBe('GET');
    });
  });
  describe('#withPost', () => {
    it('should set method to POST', () => {
      const request = new RequestBuilder()
        .withBaseUrl(API_BASE_URL)
        .withPemFilePath(PEM_FILE_PATH)
        .withEndpoint(API_ENDPOINT)
        .withPost()
        .build();

      expect(request.getMethod()).toBe('POST');
    });
  });
  describe('#withHeader', () => {
    it('should only accept string header value', () => {
      expect(() => {
        new RequestBuilder()
          .withBaseUrl(API_BASE_URL)
          .withPemFilePath(PEM_FILE_PATH)
          .withEndpoint(API_ENDPOINT)
          .withHeader('Custom-1', 'valid header')
          .withHeader('Custom-2', ['invalid header'])
          .build();
      }).toThrow(new TypeError("'Custom-2' header must be a string"));
    });

    it('should only accept string header name', () => {
      expect(() => {
        new RequestBuilder()
          .withBaseUrl(API_BASE_URL)
          .withPemFilePath(PEM_FILE_PATH)
          .withEndpoint(API_ENDPOINT)
          .withHeader('Valid-Name', 'value')
          .withHeader(['Invalid-Name'], 'value')
          .build();
      }).toThrow(new TypeError('Header name must be a string'));
    });
  });
});
