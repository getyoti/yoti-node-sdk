const { initializeProtoBufObjects } = require('../../src/proto-root');

function stringAttributeValueToBuffer(value) {
  return Buffer.from(value, 'utf8');
}

describe('the proto-root', () => {
  let protoRoot;

  beforeAll(() => {
    protoRoot = initializeProtoBufObjects();
  });

  describe('once initialised', () => {
    it('should expose its proto definitions builder with registered definition namespaces', () => {
      expect(protoRoot.builder.lookup('attrpubapi_v1')).toBeDefined();
      expect(protoRoot.builder.lookup('compubapi_v1')).toBeDefined();
      expect(protoRoot.builder.lookup('sharepubapi_v1')).toBeDefined();
    });

    it('should expose commodity methods', () => {
      expect(protoRoot.encodeAttributeList).toEqual(expect.any(Function));
      expect(protoRoot.decodeAttributeList).toEqual(expect.any(Function));
      //
      expect(protoRoot.encodeEncryptedData).toEqual(expect.any(Function));
      expect(protoRoot.decodeEncryptedData).toEqual(expect.any(Function));
      //
      expect(protoRoot.encodeSignedTimeStamp).toEqual(expect.any(Function));
      expect(protoRoot.decodeSignedTimeStamp).toEqual(expect.any(Function));

      expect(protoRoot.decodeExtraData).toEqual(expect.any(Function));
      expect(protoRoot.decodeThirdPartyAttribute).toEqual(expect.any(Function));
    });
  });

  describe('#decodeAttributeList()', () => {
    describe('extracts and returns an array with attributes and the extendedProfile and extendedProfileList', () => {
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
        const encodedAttrList = protoRoot.encodeAttributeList(rawAttributesList);
        decodedAttrList = protoRoot.decodeAttributeList(encodedAttrList);
      });

      describe('where the first item ', () => {
        it('should be the first attribute', () => {
          const [firstItem] = decodedAttrList;
          expect(firstItem).toEqual({ name: 'Bob' });
        });
      });

      describe('where the second item ', () => {
        it('should be the second attribute', () => {
          const [, secondItem] = decodedAttrList;
          expect(secondItem).toEqual({ gender: 'male' });
        });
      });

      describe('where the before last item ', () => {
        it('should be containing the extendedProfile', () => {
          const [, , beforeLastItem] = decodedAttrList;
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
          const [, , , lastItem] = decodedAttrList;
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
      let decodedAttrList;

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
        const encodedAttrList = protoRoot.encodeAttributeList(rawAttributesList);
        decodedAttrList = protoRoot.decodeAttributeList(encodedAttrList);
      });

      it('should include an id (with the ephemeralId value)', () => {
        const [
          firstItem,
          secondItem,
          { extendedProfile },
          { extendedProfileList },
        ] = decodedAttrList;
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
