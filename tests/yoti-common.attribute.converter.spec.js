const expect = require('chai').expect;
const fs = require('fs');
const { AttributeConverter } = require('../src/yoti_common/attribute.converter');
const protoRoot = require('../src/proto-root');
const ImageJpeg = require('../src/data_type/image.jpeg');
const ImagePng = require('../src/data_type/image.png');
const MultiValue = require('../src/data_type/multi.value');
const constants = require('../src/yoti_common/constants');
const Buffer = require('safe-buffer').Buffer;

const sampleMultiValueAttribute = fs.readFileSync('./tests/sample-data/fixtures/attributes/multi-value.txt', 'utf8');
const protoInst = protoRoot.initializeProtoBufObjects();

const CONTENT_TYPE_STRING = 1;
const CONTENT_TYPE_JPEG = 2;
const CONTENT_TYPE_PNG = 4;
const CONTENT_TYPE_MULTI_VALUE = 6;

/**
 * Converts and return the sample proto MultiValue attribute.
 *
 * @returns {MultiValue}
 */
const convertSampleMultiValue = () => {
  const protoAttribute = protoInst
    .builder
    .attrpubapi_v1
    .Attribute
    .decode(sampleMultiValueAttribute);

  return AttributeConverter.convertValueBasedOnContentType(
    protoAttribute.value,
    CONTENT_TYPE_MULTI_VALUE
  );
};

/**
 * Creates a test MultiValue Value.
 *
 * @param {String} contentType
 * @param {String} value
 */
const createTestMultiValueValue = (contentType, value) => {
  const multiValueValue = protoInst
    .builder
    .attrpubapi_v1
    .MultiValue
    .Value;

  const encoded = multiValueValue.encode({
    contentType,
    data: Buffer.from(value, 'utf8'),
  });

  return multiValueValue.decode(encoded);
};

/**
 * Creates a test MultiValue attribute.
 *
 * @returns {ByteBuffer}
 */
const createTestMultiValue = () => {
  const multiValueItems = {
    values: [
      createTestMultiValueValue(CONTENT_TYPE_JPEG, 'image_1'),
      createTestMultiValueValue(CONTENT_TYPE_PNG, 'image_2'),
      createTestMultiValueValue(CONTENT_TYPE_STRING, 'string 1'),
      createTestMultiValueValue(CONTENT_TYPE_STRING, ''),
    ],
  };

  const nestedProtoMultiValue = protoInst
    .builder
    .attrpubapi_v1
    .MultiValue
    .encode(multiValueItems);

  // Add a nested MultiValue attribute.
  multiValueItems.values.push({
    contentType: CONTENT_TYPE_MULTI_VALUE,
    data: nestedProtoMultiValue,
  });

  const protoMultiValue = protoInst
    .builder
    .attrpubapi_v1
    .MultiValue
    .encode(multiValueItems);

  return protoMultiValue;
};

/**
 * Asserts that provided image is expected.
 *
 * @param {Image} image
 * @param {String} mimeType
 * @param {String} base64Last10
 */
const assertIsExpectedImage = (image, mimeType, base64Last10) => {
  expect(image).to.be.instanceOf(ImageJpeg);
  expect(image.getMimeType()).to.equal(mimeType);
  const base64String = image.getBase64Content();
  expect(base64String.substr(base64String.length - 10)).to.equal(base64Last10);
};

describe('attributeConverter', () => {
  describe('#convertValueBasedOnContentType', () => {
    it('should return multi value object', () => {
      const multiValue = convertSampleMultiValue();
      expect(multiValue.getItems().length).to.equal(2);
      expect(multiValue).to.be.instanceOf(MultiValue);
      assertIsExpectedImage(multiValue.getItems()[0], 'image/jpeg', 'vWgD//2Q==');
      assertIsExpectedImage(multiValue.getItems()[1], 'image/jpeg', '38TVEH/9k=');
    });
    it('should include all content types', () => {
      const multiValue = AttributeConverter.convertValueBasedOnContentType(
        createTestMultiValue(),
        CONTENT_TYPE_MULTI_VALUE
      );
      // Check top-level items.
      const items = multiValue.getItems();
      expect(items[0]).to.be.instanceOf(ImageJpeg);
      expect(items[1]).to.be.instanceOf(ImagePng);
      expect(items[2]).to.equal('string 1');
      expect(items[3]).to.equal('');
      expect(items[4]).to.be.instanceOf(MultiValue);

      // Check nested MultiValue.
      const nestedItems = items[4].getItems();
      expect(nestedItems[0]).to.be.instanceOf(ImageJpeg);
      expect(nestedItems[1]).to.be.instanceOf(ImagePng);
      expect(nestedItems[2]).to.equal('string 1');
      expect(nestedItems[3]).to.equal('');
    });
  });
  describe('#convertValueBasedOnAttributeName', () => {
    it('should return array of image objects', () => {
      const documentImages = AttributeConverter
        .convertValueBasedOnAttributeName(
          convertSampleMultiValue(),
          constants.ATTR_DOCUMENT_IMAGES
        );

      expect(documentImages.length).to.equal(2);
      documentImages.forEach((item) => {
        expect(item).to.be.instanceOf(ImageJpeg);
        expect(item.getMimeType()).to.equal('image/jpeg');
      });
    });
  });
});
