const { AmlAddress, AmlProfile } = require('../../src/aml_type');
const { Payload } = require('../..');

describe('amlPayload', () => {
  const amlAddress = new AmlAddress('GBR');
  const amlProfile = new AmlProfile('Edward Richard George', 'Heath', amlAddress);
  const amlPayload = new Payload(amlProfile.getData());
  const expectedPayloadJSON = '{"given_names":"Edward Richard George","family_name":"Heath","address":{"country":"GBR"}}';
  const expectedBase64Payload = 'eyJnaXZlbl9uYW1lcyI6IkVkd2FyZCBSaWNoYXJkIEdlb3JnZSIsImZhbWlseV9uYW1lIjoiSGVhdGgiLCJhZGRyZXNzIjp7ImNvdW50cnkiOiJHQlIifX0=';

  describe('#getPayloadJSON', () => {
    it('should return the payload JSON string', () => {
      const payloadJSON = amlPayload.getPayloadJSON();
      expect(payloadJSON).toBe(expectedPayloadJSON);
    });
  });

  describe('#getBase64Payload', () => {
    it('should return the base64Payload string', () => {
      const base64Payload = amlPayload.getBase64Payload();
      expect(base64Payload).toBe(expectedBase64Payload);
    });
  });
});
