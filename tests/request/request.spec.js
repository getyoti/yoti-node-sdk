const { expect } = require('chai');

const { YotiRequest } = require('../../src/request/request');
const { Payload } = require('../../src/request/payload');

const SOME_URL = 'https://api.example.com/some-endpoint';
const SOME_METHOD = 'POST';
const SOME_PAYLOAD = new Payload('some payload');
const SOME_HEADERS = {
  some: 'header',
};
const SOME_REQUEST = new YotiRequest(SOME_METHOD, SOME_URL, SOME_HEADERS, SOME_PAYLOAD);

describe('YotiRequest', () => {
  describe('#getUrl', () => {
    it('should return the URL', () => {
      expect(SOME_REQUEST.getUrl()).equals(SOME_URL);
    });
  });
  describe('#getMethod', () => {
    it('should return the method', () => {
      expect(SOME_REQUEST.getMethod()).equals(SOME_METHOD);
    });
  });
  describe('#getPayload', () => {
    it('should return the payload', () => {
      expect(SOME_REQUEST.getPayload()).equals(SOME_PAYLOAD);
    });
  });
  describe('#getHeaders', () => {
    it('should return the header', () => {
      expect(SOME_REQUEST.getHeaders()).equals(SOME_HEADERS);
    });
  });
  describe('#constructor', () => {
    context('When provided non-string URL', () => {
      it('should throw TypeError', () => {
        expect(() => new YotiRequest(SOME_METHOD, ['invalid'], SOME_HEADERS, SOME_PAYLOAD))
          .to.throw(TypeError, 'url must be a string');
      });
    });
    context('When provided invalid payload', () => {
      it('should throw TypeError', () => {
        expect(() => new YotiRequest(SOME_METHOD, SOME_URL, SOME_HEADERS, ['invalid']))
          .to.throw(TypeError, 'payload must be instance of Payload');
      });
    });
    context('When provided invalid method', () => {
      it('should throw Error', () => {
        expect(() => new YotiRequest('INVALID', SOME_URL, SOME_HEADERS, SOME_PAYLOAD))
          .to.throw(Error, 'HTTP method INVALID is not supported');
      });
    });
    context('When provided invalid headers', () => {
      it('should throw TypeError', () => {
        const invalidHeader = {
          some: {
            invalid: 'header',
          },
        };
        expect(() => new YotiRequest(SOME_METHOD, SOME_URL, invalidHeader, SOME_PAYLOAD))
          .to.throw(TypeError, 'all values in headers must be a string');
      });
    });
  });
});
