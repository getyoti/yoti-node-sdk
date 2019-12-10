const { YotiRequest } = require('../../src/request/request');
const requestHandler = require('../../src/request/request.handler');
const { Payload } = require('../../src/request/payload');

jest.mock('../../src/request/request.handler');

const SOME_URL = 'https://api.example.com/some-endpoint';
const SOME_METHOD = 'POST';
const SOME_PAYLOAD = new Payload('some payload');
const SOME_HEADERS = {
  some: 'header',
};
const SOME_REQUEST = new YotiRequest(SOME_METHOD, SOME_URL, SOME_HEADERS, SOME_PAYLOAD);

describe('YotiRequest', () => {
  describe('#execute', () => {
    it('should execute the request handler', () => {
      SOME_REQUEST.execute();
      expect(requestHandler.execute).toHaveBeenCalledWith(SOME_REQUEST, false);
    });
    it('should execute the request handler with buffer disabled', () => {
      SOME_REQUEST.execute(false);
      expect(requestHandler.execute).toHaveBeenCalledWith(SOME_REQUEST, false);
    });
    it('should execute the request handler with buffer enabled', () => {
      SOME_REQUEST.execute(true);
      expect(requestHandler.execute).toHaveBeenCalledWith(SOME_REQUEST, true);
    });
  });
  describe('#getUrl', () => {
    it('should return the URL', () => {
      expect(SOME_REQUEST.getUrl()).toBe(SOME_URL);
    });
  });
  describe('#getMethod', () => {
    it('should return the method', () => {
      expect(SOME_REQUEST.getMethod()).toBe(SOME_METHOD);
    });
  });
  describe('#getPayload', () => {
    it('should return the payload', () => {
      expect(SOME_REQUEST.getPayload()).toBe(SOME_PAYLOAD);
    });
  });
  describe('#getHeaders', () => {
    it('should return the header', () => {
      expect(SOME_REQUEST.getHeaders()).toBe(SOME_HEADERS);
    });
  });
  describe('#constructor', () => {
    describe('When provided non-string URL', () => {
      it('should throw TypeError', () => {
        expect(() => new YotiRequest(SOME_METHOD, ['invalid'], SOME_HEADERS, SOME_PAYLOAD))
          .toThrow(new TypeError('url must be a string'));
      });
    });
    describe('When provided invalid payload', () => {
      it('should throw TypeError', () => {
        expect(() => new YotiRequest(SOME_METHOD, SOME_URL, SOME_HEADERS, ['invalid']))
          .toThrow(new TypeError('payload must be instance of Payload'));
      });
    });
    describe('When provided invalid method', () => {
      it('should throw Error', () => {
        expect(() => new YotiRequest('INVALID', SOME_URL, SOME_HEADERS, SOME_PAYLOAD))
          .toThrow(new Error('HTTP method INVALID is not supported'));
      });
    });
    describe('When provided invalid headers', () => {
      it('should throw TypeError', () => {
        const invalidHeader = {
          some: {
            invalid: 'header',
          },
        };
        expect(() => new YotiRequest(SOME_METHOD, SOME_URL, invalidHeader, SOME_PAYLOAD))
          .toThrow(new TypeError('all values in headers must be a string'));
      });
    });
  });
});
