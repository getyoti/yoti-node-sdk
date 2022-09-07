const IDVError = require('../../src/idv_service/idv.error');

const SOME_CODE = 'SOME_CODE';
const SOME_MESSAGE = 'SOME_MESSAGE';

const SOME_RESPONSE = {
  code: SOME_CODE,
  message: SOME_MESSAGE,
};

const SOME_PROPERTY = 'some.property';
const SOME_PROPERTY_MESSAGE = 'some property message';
const SOME_OTHER_PROPERTY = 'some.other.property';
const SOME_OTHER_PROPERTY_MESSAGE = 'some other property message';

const SOME_RESPONSE_WITH_ERRORS = {
  code: SOME_CODE,
  message: SOME_MESSAGE,
  errors: [
    {
      property: SOME_PROPERTY,
      message: SOME_PROPERTY_MESSAGE,
    },
    {
      property: SOME_OTHER_PROPERTY,
      message: SOME_OTHER_PROPERTY_MESSAGE,
    },
  ],
};

const SOME_RESPONSE_WITH_UNKNOWN_ERRORS = {
  code: SOME_CODE,
  message: SOME_MESSAGE,
  errors: [
    {
      some: 'unknown error',
    },
  ],
};

describe('IDVError', () => {
  let idvError;

  describe('when error has response', () => {
    beforeEach(() => {
      const someError = new Error('some error message');

      someError.response = {
        statusCode: 400,
        body: SOME_RESPONSE,
        text: JSON.stringify(SOME_RESPONSE),
      };

      idvError = new IDVError(someError);
    });

    it('should be instance of Error', () => {
      expect(idvError).toBeInstanceOf(Error);
    });

    describe('#message', () => {
      it('should return the error message', () => {
        expect(idvError.message).toBe(`${SOME_CODE} - ${SOME_MESSAGE}`);
      });
    });

    describe('#name', () => {
      it('should return the error name', () => {
        expect(idvError.name).toBe('IDVError');
      });
    });

    describe('#getResponseStatusCode', () => {
      it('should return the status code', () => {
        expect(idvError.getResponseStatusCode()).toBe(400);
      });
    });

    describe('#getResponseBody', () => {
      it('should return the response body', () => {
        expect(idvError.getResponseBody()).toBe(SOME_RESPONSE);
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

      idvError = new IDVError(someError);
    });

    it('should be instance of Error', () => {
      expect(idvError).toBeInstanceOf(Error);
    });

    describe('#message', () => {
      it('should return the error message', () => {
        expect(idvError.message)
          .toBe(`${SOME_CODE} - ${SOME_MESSAGE}: ${SOME_PROPERTY} "${SOME_PROPERTY_MESSAGE}", ${SOME_OTHER_PROPERTY} "${SOME_OTHER_PROPERTY_MESSAGE}"`);
      });
    });

    describe('#name', () => {
      it('should return the error name', () => {
        expect(idvError.name).toBe('IDVError');
      });
    });

    describe('#getResponseStatusCode', () => {
      it('should return the status code', () => {
        expect(idvError.getResponseStatusCode()).toBe(400);
      });
    });

    describe('#getResponseBody', () => {
      it('should return the response body', () => {
        expect(idvError.getResponseBody()).toBe(SOME_RESPONSE_WITH_ERRORS);
      });
    });
  });
  describe('when error has response with unknown errors', () => {
    beforeEach(() => {
      const someError = new Error('some error message');

      someError.response = {
        statusCode: 400,
        body: SOME_RESPONSE_WITH_UNKNOWN_ERRORS,
        text: JSON.stringify(SOME_RESPONSE_WITH_UNKNOWN_ERRORS),
      };

      idvError = new IDVError(someError);
    });

    describe('#message', () => {
      it('should exclude unknown errors', () => {
        expect(idvError.message)
          .toBe(`${SOME_CODE} - ${SOME_MESSAGE}`);
      });
    });
  });
  describe('when error has no response', () => {
    beforeEach(() => {
      const someError = new Error('some error message');
      idvError = new IDVError(someError);
    });

    it('should be instance of Error', () => {
      expect(idvError).toBeInstanceOf(Error);
    });

    describe('#message', () => {
      it('should return the error message', () => {
        expect(idvError.message).toBe('some error message');
      });
    });

    describe('#name', () => {
      it('should return the error name', () => {
        expect(idvError.name).toBe('IDVError');
      });
    });

    describe('#getResponseStatusCode', () => {
      it('should return null', () => {
        expect(idvError.getResponseStatusCode()).toBeNull();
      });
    });

    describe('#getResponseBody', () => {
      it('should return null', () => {
        expect(idvError.getResponseBody()).toBeNull();
      });
    });
  });
});
