const FormData = require('form-data');
const { Payload } = require('../..');
const { ContentType } = require('../../src/request/constants');

describe('Payload', () => {
  describe('when content type not supported', () => {
    it('should throw an error', () => {
      expect(() => new Payload({}, 'random')).toThrow('Payload content type must be specified and one of [application/json,multipart/form-data]');
    });
  });

  describe('when content type is json', () => {
    const json = { a: '1' };
    const expectedBase64JsonPayload = 'eyJhIjoiMSJ9';
    const payload = new Payload(json);

    describe('#getContentType', () => {
      it('should return the payload content type', () => {
        const payloadJSON = payload.getContentType();
        expect(payloadJSON).toBe('application/json');
      });
    });

    describe('#getPayloadData', () => {
      it('should return the payload data as a string', () => {
        const payloadData = payload.getPayloadData();
        expect(payloadData).toEqual(JSON.stringify(json));
      });
    });

    describe('#getBase64Payload', () => {
      it('should return the payload data as base64 string', () => {
        const base64Payload = payload.getBase64Payload();
        expect(base64Payload).toBe(expectedBase64JsonPayload);
      });
    });
  });

  describe('when content type is data form', () => {
    const payloadDataForDataForm = {
      getFormDataFields: () => [{
        name: 'one',
        value: 'two',
      }],
    };

    const FORM_DATA_BOUNDARY = '----boundary';
    const expectedBase64DataFormPayload = 'LS0tLS0tYm91bmRhcnkNCkNvbnRlbnQtRGlzcG9zaXRpb246IGZvcm0tZGF0YTsgbmFtZT0ib25lIg0KDQp0d28NCi0tLS0tLWJvdW5kYXJ5LS0NCg==';

    jest.spyOn(FormData.prototype, 'getBoundary').mockReturnValue(FORM_DATA_BOUNDARY);
    const payload = new Payload(payloadDataForDataForm, ContentType.FORM_DATA);

    afterAll(() => {
      jest.restoreAllMocks();
    });

    describe('#getContentType', () => {
      it('should return the payload content type', () => {
        const payloadJSON = payload.getContentType();
        expect(payloadJSON).toBe('multipart/form-data');
      });
    });

    describe('#getPayloadData', () => {
      it('should return the payload data as a buffer', () => {
        const payloadData = payload.getPayloadData();

        expect(payloadData.toString('base64')).toBe(expectedBase64DataFormPayload);
      });
    });

    describe('#getBase64Payload', () => {
      it('should return the payload data as base64 string', () => {
        const base64Payload = payload.getBase64Payload();

        expect(base64Payload).toBe(expectedBase64DataFormPayload);
      });
    });
  });
});
