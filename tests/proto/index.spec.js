const proto = require('../../src/proto');

const { types, messages } = proto;

describe('the proto', () => {
  describe('has loaded protobuf definition', () => {
    it('should expose them as "types"', () => {
      expect(types.Anchor).toBeDefined();
      expect(types.Attribute).toBeDefined();
      expect(types.AttributeList).toBeDefined();
      expect(types.MultiValue).toBeDefined();
      expect(types.EncryptedData).toBeDefined();
      expect(types.DataEntry).toBeDefined();
      expect(types.ExtraData).toBeDefined();
      expect(types.ThirdPartyAttribute).toBeDefined();
      expect(types.SignedTimestamp).toBeDefined();
    });
  });

  describe('has prepared sugar syntax method to use type as "messages"', () => {
    function stringAttributeValueToBuffer(value) {
      return Buffer.from(value, 'utf8');
    }

    describe('#decodeAttributeList()', () => {
      describe('extracts and returns an object with property "attributes"', () => {
        let rawAttributesList;
        let decodedAttrList;

        beforeEach(() => {
          rawAttributesList = [
            {
              name: 'name',
              value: stringAttributeValueToBuffer('Bob'),
              contentType: 1,
            },
            {
              name: 'gender',
              value: stringAttributeValueToBuffer('male'),
              contentType: 1,
            },
          ];
          const encodedAttrList = messages.encodeAttributeList(rawAttributesList);
          decodedAttrList = messages.decodeAttributeList(encodedAttrList);
        });

        it('should be the first attribute', () => {
          expect(decodedAttrList).toHaveProperty('attributes');
          expect(decodedAttrList.attributes).toHaveLength(2);
          const attributeToCheck = decodedAttrList.attributes[0];
          expect(attributeToCheck.$type).toBe(types.Attribute);
        });
      });
    });
  });
});
