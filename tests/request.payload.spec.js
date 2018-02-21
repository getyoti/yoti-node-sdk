const { expect } = require('chai');

const { AmlAddress } = require('../src/aml_type');
const { AmlProfile } = require('../src/aml_type');
const { Payload } = require('../src/request/payload');

describe('amlPayload', () => {
  const amlAddress = new AmlAddress('GBR');
  const amlProfile = new AmlProfile('Edward Richard George', 'Heath', amlAddress);
  const amlPayload = new Payload(amlProfile.getData());
  const expectedPayloadJSON = '{"given_names":"Edward Richard George","family_name":"Heath","ssn":"","address":{"post_code":"","country":"GBR"}}';
  const expectedBase64Payload = 'eyJnaXZlbl9uYW1lcyI6IkVkd2FyZCBSaWNoYXJkIEdlb3JnZSIsImZhbWlseV9uYW1lIjoiSGVhdGgiLCJzc24iOiIiLCJhZGRyZXNzIjp7InBvc3RfY29kZSI6IiIsImNvdW50cnkiOiJHQlIifX0=';

  describe('#getPayloadJSON', () => {
    it('should return the payload JSON string', () => {
      const payloadJSON = amlPayload.getPayloadJSON();
      expect(payloadJSON).to.equal(expectedPayloadJSON);
    });
  });

  describe('#getBase64Payload', () => {
    it('should return the base64Payload string', () => {
      const base64Payload = amlPayload.getBase64Payload();
      expect(base64Payload).to.equal(expectedBase64Payload);
    });
  });
});
