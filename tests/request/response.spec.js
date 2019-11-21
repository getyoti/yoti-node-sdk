const { YotiResponse } = require('../../src/request/response');

const SOME_BODY = '{"some":"response"}';
const SOME_RECEIPT = { some: 'receipt' };
const SOME_PARSED_RESPONSE = JSON.parse(SOME_BODY);
const SOME_HEADERS = {
  'Some-Header': 'some value',
  'Some-Other-Header': 'some other value',
};
const SOME_RESPONSE = new YotiResponse(
  SOME_PARSED_RESPONSE,
  200,
  SOME_RECEIPT,
  SOME_BODY,
  SOME_HEADERS
);

describe('YotiResponse', () => {
  describe('#getBody', () => {
    it('should return the body', () => {
      expect(SOME_RESPONSE.getBody()).toBe(SOME_BODY);
    });
  });
  describe('#getParsedResponse', () => {
    it('should return the parsed response', () => {
      expect(SOME_RESPONSE.getParsedResponse()).toBe(SOME_PARSED_RESPONSE);
    });
  });
  describe('#getReceipt', () => {
    it('should return the receipt', () => {
      expect(SOME_RESPONSE.getReceipt()).toBe(SOME_RECEIPT);
    });
  });
  describe('#getStatusCode', () => {
    it('should return the status code', () => {
      expect(SOME_RESPONSE.getStatusCode()).toBe(200);
    });
  });
  describe('#getHeaders', () => {
    it('should return the response headers', () => {
      expect(SOME_RESPONSE.getHeaders()).toEqual(SOME_HEADERS);
    });
  });
  describe('#constructor', () => {
    it('should not require receipt', () => {
      const SOME_RESPONSE_WITHOUT_RECEIPT = new YotiResponse(
        SOME_PARSED_RESPONSE,
        200
      );
      expect(SOME_RESPONSE_WITHOUT_RECEIPT.getReceipt()).toBeNull();
    });
    it('should not require body', () => {
      const SOME_RESPONSE_WITHOUT_BODY = new YotiResponse(
        SOME_PARSED_RESPONSE,
        200,
        SOME_RECEIPT
      );
      expect(SOME_RESPONSE_WITHOUT_BODY.getBody()).toBeNull();
    });
    it('should not require headers', () => {
      const SOME_RESPONSE_WITHOUT_HEADERS = new YotiResponse(
        SOME_PARSED_RESPONSE,
        200,
        SOME_RECEIPT,
        SOME_BODY
      );
      expect(SOME_RESPONSE_WITHOUT_HEADERS.getHeaders()).toBeNull();
    });
  });
});
