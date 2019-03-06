const expect = require('chai').expect;
const fs = require('fs');
const { AttributeConverter } = require('../src/yoti_common/attribute.converter');
const protoRoot = require('../src/proto-root');
const ImageJpeg = require('../src/data_type/image.jpeg');

const multiValueAttribute = fs.readFileSync('./tests/sample-data/fixtures/attributes/multi-value.txt', 'utf8');

const CONTENT_TYPE_MULTI_VALUE = 6;

describe('attributeConverter', () => {
  describe('#convertValueBasedOnContentType', () => {
    it('should return multi value array of attributes', () => {
      const protoInst = protoRoot.initializeProtoBufObjects();

      const attribute = protoInst
        .builder
        .attrpubapi_v1
        .Attribute
        .decode(multiValueAttribute);

      const value = AttributeConverter.convertValueBasedOnContentType(
        attribute.value,
        CONTENT_TYPE_MULTI_VALUE
      );

      expect(value[0]).to.be.instanceOf(ImageJpeg);
      expect(value[1]).to.be.instanceOf(ImageJpeg);
    });
  });
});
