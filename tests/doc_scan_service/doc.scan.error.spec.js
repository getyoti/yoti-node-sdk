const DocScanError = require('../../src/doc_scan_service/doc.scan.error');

const SOME_CODE = 'SOME_CODE';
const SOME_MESSAGE = 'SOME_MESSAGE';

const SOME_RESPONSE = {
  code: SOME_CODE,
  message: SOME_MESSAGE,
};

const SOME_RESPONSE_WITH_ERRORS = {
  code: SOME_CODE,
  message: SOME_MESSAGE,
  errors: [
    'some error',
    'some other error',
  ],
};

describe('DocScanError', () => {
  let docScanError;

  describe('when error has response', () => {
    beforeEach(() => {
      const someError = new Error('some error message');

      someError.response = {
        statusCode: 400,
        body: SOME_RESPONSE,
        text: JSON.stringify(SOME_RESPONSE),
      };

      docScanError = new DocScanError(someError);
    });

    it('should be instance of Error', () => {
      expect(docScanError).toBeInstanceOf(Error);
    });

    describe('#message', () => {
      it('should return the error message', () => {
        expect(docScanError.message).toBe(`${SOME_CODE} - ${SOME_MESSAGE}`);
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
        expect(docScanError.getResponseBody()).toBe(SOME_RESPONSE);
      });
    });
  });
  describe('when error has response with errors', () => {
    beforeEach(() => {
      const someError = new Error('some error message');

      someError.response = {
        statusCode: 400,
        body: SOME_RESPONSE_WITH_ERRORS,
        text: JSON.stringify(SOME_RESPONSE_WITH_ERRORS),
      };

      docScanError = new DocScanError(someError);
    });

    it('should be instance of Error', () => {
      expect(docScanError).toBeInstanceOf(Error);
    });

    describe('#message', () => {
      it('should return the error message', () => {
        expect(docScanError.message)
          .toBe(`${SOME_CODE} - ${SOME_MESSAGE}: ${JSON.stringify(SOME_RESPONSE_WITH_ERRORS.errors)}`);
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
        expect(docScanError.getResponseBody()).toBe(SOME_RESPONSE_WITH_ERRORS);
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
