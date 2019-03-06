const expect = require('chai').expect;
const fs = require('fs');
const { AttributeConverter } = require('../src/yoti_common/attribute.converter');
const protoRoot = require('../src/proto-root');
const ImageJpeg = require('../src/data_type/image.jpeg');
const MultiValue = require('../src/data_type/multi.value');
const DocumentImages = require('../src/data_type/document.images');
const constants = require('../src/yoti_common/constants');

const multiValueAttribute = fs.readFileSync('./tests/sample-data/fixtures/attributes/multi-value.txt', 'utf8');

const CONTENT_TYPE_MULTI_VALUE = 6;

const getMultiValue = () => {
  const protoInst = protoRoot.initializeProtoBufObjects();

  const attribute = protoInst
    .builder
    .attrpubapi_v1
    .Attribute
    .decode(multiValueAttribute);

  return AttributeConverter.convertValueBasedOnContentType(
    attribute.value,
    CONTENT_TYPE_MULTI_VALUE
  );
};

describe('attributeConverter', () => {
  describe('#convertValueBasedOnContentType', () => {
    it('should return multi value object', () => {
      const multiValue = getMultiValue();

      expect(multiValue.values.length).to.equal(2);
      expect(multiValue).to.be.instanceOf(MultiValue);
      multiValue.getValues().forEach((item) => {
        expect(item).to.be.instanceOf(ImageJpeg);
      });
    });
  });
  describe('#convertValueBasedOnAttributeName', () => {
    it('should return document images object', () => {
      const documentImages = AttributeConverter
        .convertValueBasedOnAttributeName(getMultiValue(), constants.ATTR_DOCUMENT_IMAGES);

      expect(documentImages.values.length).to.equal(2);
      expect(documentImages).to.be.instanceOf(DocumentImages);
      documentImages.getImages().forEach((item) => {
        expect(item).to.be.instanceOf(ImageJpeg);
      });
    });
  });
});
