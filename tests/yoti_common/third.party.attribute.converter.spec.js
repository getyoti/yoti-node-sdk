'use strict';

const fs = require('fs');
const protoRoot = require('../../src/proto-root');
const ThirdPartyAttributeConverter = require('../../src/yoti_common/third.party.attribute.converter');
const AttributeIssuanceDetails = require('../../src/data_type/attribute.issuance.details');

const protoInst = protoRoot.initializeProtoBufObjects();
const sampleThirdPartyAttribute = fs.readFileSync('./tests/sample-data/fixtures/extra_data/valid_third_party_attribute.txt', 'utf8');

function createTestThirdPartyAttribute(token, issuingAttributes) {
  return protoInst.builder.sharepubapi_v1.ThirdPartyAttribute.encode({
    issuanceToken: token ? Buffer.from(token, 'utf-8') : undefined,
    issuingAttributes,
  });
}

describe('ThirdPartyAttributeConverter', () => {
  describe('#convertThirdPartyAttribute', () => {
    it('should parse valid third party attribute', () => {
      const thirdPartyAttribute = ThirdPartyAttributeConverter
        .convertThirdPartyAttribute(sampleThirdPartyAttribute);

      expect(thirdPartyAttribute).toBeInstanceOf(AttributeIssuanceDetails);
      expect(thirdPartyAttribute.getToken()).toEqual('c29tZUlzc3VhbmNlVG9rZW4=');

      expect(thirdPartyAttribute.getExpiryDate()
        .getMicrosecondTimestamp()).toBe('2019-10-15T22:04:05.123000Z');

      expect(thirdPartyAttribute.getIssuingAttributes().length).toEqual(1);
      expect(thirdPartyAttribute.getIssuingAttributes()[0].getName()).toEqual('com.thirdparty.id');
    });

    it('should return undefined for invalid third party attribute protobuf', () => {
      const thirdPartyAttribute = ThirdPartyAttributeConverter.convertThirdPartyAttribute(Buffer.from('someValue'));
      expect(thirdPartyAttribute).toBe(undefined);
    });

    it('should return undefined for missing token', () => {
      const thirdPartyProto = createTestThirdPartyAttribute(undefined, undefined);
      const thirdPartyAttribute = ThirdPartyAttributeConverter
        .convertThirdPartyAttribute(thirdPartyProto);
      expect(thirdPartyAttribute).toBe(undefined);
    });

    it('should return undefined for empty token', () => {
      const thirdPartyProto = createTestThirdPartyAttribute('', undefined);
      const thirdPartyAttribute = ThirdPartyAttributeConverter
        .convertThirdPartyAttribute(thirdPartyProto);
      expect(thirdPartyAttribute).toBe(undefined);
    });

    it('should parse when issuing attributes is missing', () => {
      const thirdPartyProto = createTestThirdPartyAttribute('someToken', undefined);
      const thirdPartyAttribute = ThirdPartyAttributeConverter
        .convertThirdPartyAttribute(thirdPartyProto);

      expect(thirdPartyAttribute).not.toBe(undefined);
      expect(thirdPartyAttribute).toBeInstanceOf(AttributeIssuanceDetails);
      expect(thirdPartyAttribute.getToken()).toEqual('c29tZVRva2Vu');
      expect(thirdPartyAttribute.getExpiryDate()).toBe(undefined);
      expect(thirdPartyAttribute.getIssuingAttributes().length).toEqual(0);
    });

    it('should parse with invalid date', () => {
      const thirdPartyProto = createTestThirdPartyAttribute('someToken', {
        expiryDate: '2019-13-2',
        definitions: [
          {
            name: 'com.thirdparty.id',
          },
        ],
      });
      const thirdPartyAttribute = ThirdPartyAttributeConverter
        .convertThirdPartyAttribute(thirdPartyProto);

      expect(thirdPartyAttribute).not.toBe(undefined);
      expect(thirdPartyAttribute).toBeInstanceOf(AttributeIssuanceDetails);
      expect(thirdPartyAttribute.getExpiryDate()).toBe(undefined);
      expect(thirdPartyAttribute.getIssuingAttributes().length).toEqual(1);
      expect(thirdPartyAttribute.getIssuingAttributes()[0].getName()).toEqual('com.thirdparty.id');
    });

    it('should parse multiple attribute definitions', () => {
      const thirdPartyProto = createTestThirdPartyAttribute('someToken', {
        expiryDate: '2019-12-02T12:00:00.000Z',
        definitions: [
          {
            name: 'com.thirdparty.id',
          },
          {
            name: 'com.otherthirdparty.id',
          },
        ],
      });
      const thirdPartyAttribute = ThirdPartyAttributeConverter
        .convertThirdPartyAttribute(thirdPartyProto);

      expect(thirdPartyAttribute).not.toBe(undefined);
      expect(thirdPartyAttribute).toBeInstanceOf(AttributeIssuanceDetails);

      const definitions = thirdPartyAttribute.getIssuingAttributes();
      expect(definitions.length).toEqual(2);
      expect(definitions[0].getName()).toEqual('com.thirdparty.id');
      expect(definitions[1].getName()).toEqual('com.otherthirdparty.id');
    });
  });
});
