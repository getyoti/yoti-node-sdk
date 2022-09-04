const { AttributeListConverter } = require('../../../src/yoti_common/converters/attribute.list.converter');
const { messages } = require('../../../src/proto');

function stringAttributeValueToBuffer(value) {
  return Buffer.from(value, 'utf8');
}

function getDecodedAttributesListMessageFromInitialPayload(payload) {
  const encodedAttrList = messages.encodeAttributeList(payload);
  return messages.decodeAttributeList(encodedAttrList);
}

describe('AttributeListConverter', () => {
  describe('#convertAttributeList()', () => {
    describe('extracts and returns an array with attributes and the extendedProfile and extendedProfileList', () => {
      let rawAttributesList;
      let convertedAttributeList;

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
        const decodedMessage = getDecodedAttributesListMessageFromInitialPayload(rawAttributesList);
        convertedAttributeList = AttributeListConverter.convertAttributeList(decodedMessage);
      });

      describe('where the first item ', () => {
        it('should be the first attribute', () => {
          const [firstItem] = convertedAttributeList;
          expect(firstItem).toEqual({ name: 'Bob' });
        });
      });

      describe('where the second item ', () => {
        it('should be the second attribute', () => {
          const [, secondItem] = convertedAttributeList;
          expect(secondItem).toEqual({ gender: 'male' });
        });
      });

      describe('where the before last item ', () => {
        it('should be containing the extendedProfile', () => {
          const [, , beforeLastItem] = convertedAttributeList;
          const { extendedProfile } = beforeLastItem;
          expect(extendedProfile).toBeDefined();
          expect(extendedProfile).toEqual({
            name: expect.objectContaining({
              name: 'name',
              value: 'Bob',
              sources: expect.any(Object),
              verifiers: expect.any(Object),
              anchors: expect.any(Object),
            }),
            gender: expect.objectContaining({
              name: 'gender',
              value: 'male',
              sources: expect.any(Object),
              verifiers: expect.any(Object),
              anchors: expect.any(Object),
            }),
          });
        });
      });

      describe('where the last item ', () => {
        it('should be containing the extendedProfileList', () => {
          const [, , , lastItem] = convertedAttributeList;
          const { extendedProfileList } = lastItem;
          expect(extendedProfileList).toBeDefined();
          expect(extendedProfileList).toEqual([
            expect.objectContaining({
              name: 'name',
              value: 'Bob',
              sources: expect.any(Object),
              verifiers: expect.any(Object),
              anchors: expect.any(Object),
            }),
            expect.objectContaining({
              name: 'gender',
              value: 'male',
              sources: expect.any(Object),
              verifiers: expect.any(Object),
              anchors: expect.any(Object),
            }),
          ]);
        });
      });
    });

    describe('handles attribute\'s ephemeralId', () => {
      let rawAttributesList;
      let convertedAttributeList;

      beforeEach(() => {
        rawAttributesList = [
          {
            name: 'name',
            value: stringAttributeValueToBuffer('Bob1'),
            contentType: 1,
            ephemeralId: 'firstBob',
          },
          {
            name: 'name',
            value: stringAttributeValueToBuffer('Bob2'),
            contentType: 1,
            ephemeralId: 'secondBob',
          },
        ];
        const decodedMessage = getDecodedAttributesListMessageFromInitialPayload(rawAttributesList);
        convertedAttributeList = AttributeListConverter.convertAttributeList(decodedMessage);
      });

      it('should include an id (with the ephemeralId value)', () => {
        const [
          firstItem,
          secondItem,
          { extendedProfile },
          { extendedProfileList },
        ] = convertedAttributeList;
        expect(firstItem).toEqual({ name: 'Bob1' });
        expect(secondItem).toEqual({ name: 'Bob2' });
        expect(extendedProfile.name).toEqual({
          name: 'name',
          value: 'Bob2',
          id: 'secondBob',
          sources: expect.any(Object),
          verifiers: expect.any(Object),
          anchors: expect.any(Object),
        });
        expect(extendedProfileList.length).toBe(2);
        expect(extendedProfileList[0]).toEqual({
          name: 'name',
          value: 'Bob1',
          id: 'firstBob',
          sources: expect.any(Object),
          verifiers: expect.any(Object),
          anchors: expect.any(Object),
        });
        expect(extendedProfileList[1]).toEqual({
          name: 'name',
          value: 'Bob2',
          id: 'secondBob',
          sources: expect.any(Object),
          verifiers: expect.any(Object),
          anchors: expect.any(Object),
        });
      });
    });
  });
});
