const DocScanError = require('../../src/doc_scan_service/doc.scan.error');

const SOME_RESPONSE_BODY = { some: 'body' };
const SOME_RESPONSE_TEXT = JSON.stringify(SOME_RESPONSE_BODY);

describe('DocScanError', () => {
  let docScanError;

  describe('when error has response', () => {
    beforeEach(() => {
      const someError = new Error('some error message');

      someError.response = {
        statusCode: 400,
        body: SOME_RESPONSE_BODY,
        text: SOME_RESPONSE_TEXT,
      };

      docScanError = new DocScanError(someError);
    });

    it('should be instance of Error', () => {
      expect(docScanError).toBeInstanceOf(Error);
    });

    describe('#message', () => {
      it('should return the error message', () => {
        expect(docScanError.message).toBe(`some error message: ${SOME_RESPONSE_TEXT}`);
      });
    });

    describe('#name', () => {
      it('should return the error name', () => {
        expect(docScanError.name).toBe('DocScanError');
      });
    });

    describe('#getResponseStatusCode', () => {
      it('should return the status code', () => {
        expect(docScanError.getResponseStatusCode()).toBe(400);
      });
    });

    describe('#getResponseBody', () => {
      it('should return the response body', () => {
        expect(docScanError.getResponseBody()).toBe(SOME_RESPONSE_BODY);
      });
    });
  });
  describe('when error has no response', () => {
    beforeEach(() => {
      const someError = new Error('some error message');
      docScanError = new DocScanError(someError);
    });

    it('should be instance of Error', () => {
      expect(docScanError).toBeInstanceOf(Error);
    });

    describe('#message', () => {
      it('should return the error message', () => {
        expect(docScanError.message).toBe('some error message');
      });
    });

    describe('#name', () => {
      it('should return the error name', () => {
        expect(docScanError.name).toBe('DocScanError');
      });
    });

    describe('#getResponseStatusCode', () => {
      it('should return null', () => {
        expect(docScanError.getResponseStatusCode()).toBeNull();
      });
    });

    describe('#getResponseBody', () => {
      it('should return null', () => {
        expect(docScanError.getResponseBody()).toBeNull();
      });
    });
  });
});
