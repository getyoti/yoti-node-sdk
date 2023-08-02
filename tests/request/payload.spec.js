const FormData = require('form-data');
const { Payload } = require('../..');
const { ContentType } = require('../../src/request/constants');

describe('Payload', () => {
  const expectedBase64JsonPayload = 'eyJhIjoiMSJ9';

  describe('when content type not supported', () => {
    it('should throw an error', () => {
      expect(() => new Payload({}, 'random')).toThrow('Payload content type must be specified and one of [application/json,multipart/form-data]');
    });
  });

  describe('when content type is json', () => {
    const json = { a: '1' };
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
        expect(Buffer.from(payloadData).toString('base64')).toBe(expectedBase64JsonPayload);
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
    const dataFormFields = {
      getFormDataFields: () => [{
        name: 'one',
        value: 'two',
      }],
    };

    const payload = new Payload(dataFormFields, ContentType.FORM_DATA);

    describe('#getContentType', () => {
      it('should return the payload content type', () => {
        const payloadJSON = payload.getContentType();
        expect(payloadJSON).toBe('multipart/form-data');
      });
    });

    describe('#getPayloadData', () => {
      it('should return the payload data as a buffer', () => {
        const payloadData = payload.getPayloadData();

        const formData = new FormData();
        formData.setBoundary(payload.getRawData().getBoundary());
        const { name, value } = dataFormFields.getFormDataFields()[0];
        formData.append(name, value);

        const expectedBase64 = formData.getBuffer().toString('base64');
        expect(payloadData.toString('base64')).toBe(expectedBase64);
      });
    });

    describe('#getBase64Payload', () => {
      it('should return the payload data as base64 string', () => {
        const base64Payload = payload.getBase64Payload();

        const formData = new FormData();
        formData.setBoundary(payload.getRawData().getBoundary());
        const { name, value } = dataFormFields.getFormDataFields()[0];
        formData.append(name, value);

        const expectedBase64 = formData.getBuffer().toString('base64');

        expect(base64Payload).toBe(expectedBase64);
      });
    });
  });
});
