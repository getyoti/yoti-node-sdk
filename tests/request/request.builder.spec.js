const nock = require('nock');
const fs = require('fs');

const { RequestBuilder, Payload } = require('../..');
const yotiPackage = require('../../package.json');

const PEM_FILE_PATH = './tests/sample-data/keys/node-sdk-test.pem';
const PEM_STRING = fs.readFileSync(PEM_FILE_PATH, 'utf8');
const API_BASE_URL = 'https://api.example.com';
const API_ENDPOINT = '/some-endpoint';
const CONTENT_TYPE_HEADER_NAME = 'Content-Type';
const CONTENT_TYPE_JSON = 'application/json';
const DEFAULT_HEADERS = {
  'X-Yoti-SDK': 'Node',
  'X-Yoti-SDK-Version': `Node-${yotiPackage.version}`,
  Accept: CONTENT_TYPE_JSON,
  'X-Yoti-Auth-Digest': new RegExp('^[a-zA-Z0-9/+=]{344}$'),
};
const SOME_PAYLOAD = new Payload({ some: 'data' });

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
    it('should build a Request with pem string', () => {
      const request = new RequestBuilder()
        .withBaseUrl(API_BASE_URL)
        .withPemString(PEM_STRING)
        .withEndpoint(API_ENDPOINT)
        .withGet()
        .build();

      expect(request).toHaveHeaders(DEFAULT_HEADERS);
      expect(request.getHeaders()[CONTENT_TYPE_HEADER_NAME]).toBeUndefined();
    });

    it('should build a Request with pem file path', () => {
      const request = new RequestBuilder()
        .withBaseUrl(API_BASE_URL)
        .withPemFilePath(PEM_FILE_PATH)
        .withEndpoint(API_ENDPOINT)
        .withGet()
        .build();

      expect(request).toHaveHeaders(DEFAULT_HEADERS);
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

    it('should build with valid headers', () => {
      const request = new RequestBuilder()
        .withBaseUrl(API_BASE_URL)
        .withPemFilePath(PEM_FILE_PATH)
        .withEndpoint(API_ENDPOINT)
        .withHeader('Custom-1', 'value 1')
        .withHeader('Custom-2', 'value 2')
        .withGet()
        .build();

      expect(request).toHaveHeaders(DEFAULT_HEADERS);
      expect(request).toHaveHeaders({
        'Custom-1': 'value 1',
        'Custom-2': 'value 2',
      });
    });
  });
  describe('#withEndpoint', () => {
    [
      `///${API_ENDPOINT}`,
      API_ENDPOINT.replace(/^\/+/, ''),
    ].forEach((endpoint) => {
      it(`should ensure "${endpoint}" has one leading slash`, () => {
        const request = new RequestBuilder()
          .withBaseUrl(`${API_BASE_URL}`)
          .withPemFilePath(PEM_FILE_PATH)
          .withEndpoint(endpoint)
          .withGet()
          .build();

        expect(request).toHaveHeaders(DEFAULT_HEADERS);
      });
    });
  });
  describe('#withBaseUrl', () => {
    it('should remove trailing slashes', () => {
      const request = new RequestBuilder()
        .withBaseUrl(`${API_BASE_URL}///`)
        .withPemFilePath(PEM_FILE_PATH)
        .withEndpoint(API_ENDPOINT)
        .withGet()
        .build();

      expect(request).toHaveHeaders(DEFAULT_HEADERS);
    });
  });
  describe('#withPayload', () => {
    it('should set the provided payload', () => {
      const request = new RequestBuilder()
        .withBaseUrl(API_BASE_URL)
        .withPemFilePath(PEM_FILE_PATH)
        .withEndpoint(API_ENDPOINT)
        .withPayload(SOME_PAYLOAD)
        .withPost()
        .build();

      expect(request.getPayload()).toStrictEqual(SOME_PAYLOAD);
      expect(request).toHaveHeaders(DEFAULT_HEADERS);
      expect(request.getHeaders()[CONTENT_TYPE_HEADER_NAME]).toBe(CONTENT_TYPE_JSON);
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

expect.extend({
  toHaveHeaders(request, expectedHeaders) {
    Object.keys(expectedHeaders).forEach((header) => {
      const headerValue = request.getHeaders()[header];
      const expectedHeaderValue = expectedHeaders[header];

      if (expectedHeaderValue instanceof RegExp) {
        expect(headerValue).toMatch(expectedHeaderValue);
      } else {
        expect(headerValue).toBe(expectedHeaderValue);
      }
    });
    return {
      message: () => 'Request contains expected headers',
      pass: true,
    };
  },
});
