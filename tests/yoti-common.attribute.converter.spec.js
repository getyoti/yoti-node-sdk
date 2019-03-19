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
const CONTENT_TYPE_DATE = 3;
const CONTENT_TYPE_PNG = 4;
const CONTENT_TYPE_BYTES = 5;
const CONTENT_TYPE_MULTI_VALUE = 6;
const CONTENT_TYPE_INT = 7;

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
const createTestMultiValue = (multiValueItems) => {
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
 * Array of non-string content types.
 */
const nonStringContentTypes = [
  CONTENT_TYPE_JPEG,
  CONTENT_TYPE_DATE,
  CONTENT_TYPE_PNG,
  CONTENT_TYPE_BYTES,
  CONTENT_TYPE_MULTI_VALUE,
  CONTENT_TYPE_INT,
];

/**
 * Creates a test attribute.
 *
 * @param {String} contentType
 * @param {String} value
 */
const createTestAttribute = (contentType, value) => {
  const attribute = protoInst
    .builder
    .attrpubapi_v1
    .Attribute;

  const encoded = attribute.encode({
    contentType,
    value: Buffer.from(value, 'utf8'),
  });

  return attribute.decode(encoded);
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
        createTestMultiValue({
          values: [
            createTestMultiValueValue(CONTENT_TYPE_JPEG, 'image_1'),
            createTestMultiValueValue(CONTENT_TYPE_PNG, 'image_2'),
            createTestMultiValueValue(CONTENT_TYPE_STRING, 'string 1'),
          ],
        }),
        CONTENT_TYPE_MULTI_VALUE
      );
      // Check top-level items.
      const items = multiValue.getItems();
      expect(items[0]).to.be.instanceOf(ImageJpeg);
      expect(items[1]).to.be.instanceOf(ImagePng);
      expect(items[2]).to.equal('string 1');
      expect(items[3]).to.be.instanceOf(MultiValue);

      // Check nested MultiValue.
      const nestedItems = items[3].getItems();
      expect(nestedItems[0]).to.be.instanceOf(ImageJpeg);
      expect(nestedItems[1]).to.be.instanceOf(ImagePng);
      expect(nestedItems[2]).to.equal('string 1');
    });
    it('should return empty string values', () => {
      const protoAttr = createTestAttribute(CONTENT_TYPE_STRING, '');
      const value = AttributeConverter.convertValueBasedOnContentType(
        protoAttr.value,
        CONTENT_TYPE_STRING
      );
      expect(value).to.equal('');
    });
    it('should not allow empty non-string values', () => {
      nonStringContentTypes.forEach((contentType) => {
        const protoAttr = createTestAttribute(contentType, '');
        let errMessage = null;
        try {
          AttributeConverter.convertValueBasedOnContentType(
            protoAttr.value,
            contentType
          );
        } catch (err) {
          errMessage = err.message;
        }
        expect(errMessage).to.equal('Warning: value is NULL', `Content Type: ${contentType}`);
      });
    });
    it('should return integer values', () => {
      const integers = [0, 1, 123, -10, -1];
      integers.forEach((integer) => {
        const protoAttr = createTestAttribute(CONTENT_TYPE_INT, integer.toString(10));
        const value = AttributeConverter.convertValueBasedOnContentType(
          protoAttr.value,
          CONTENT_TYPE_INT
        );
        expect(value).to.equal(integer);
      });
    });
    it('should allow empty string MultiValue values', () => {
      const multiValue = AttributeConverter.convertValueBasedOnContentType(
        createTestMultiValue({
          values: [
            createTestMultiValueValue(CONTENT_TYPE_STRING, ''),
            createTestMultiValueValue(CONTENT_TYPE_PNG, 'image_2'),
          ],
        }),
        CONTENT_TYPE_MULTI_VALUE
      );
      expect(multiValue.getItems()[0]).to.equal('');
      expect(multiValue.getItems()[1]).to.be.instanceOf(ImagePng);
    });
    it('should not allow empty non-string MultiValue values', () => {
      nonStringContentTypes.forEach((contentType) => {
        let errMessage = null;
        try {
          AttributeConverter.convertValueBasedOnContentType(
            createTestMultiValue({
              values: [
                createTestMultiValueValue(contentType, ''),
                createTestMultiValueValue(CONTENT_TYPE_PNG, 'image_2'),
              ],
            }),
            CONTENT_TYPE_MULTI_VALUE
          );
        } catch (err) {
          errMessage = err.message;
        }
        expect(errMessage).to.equal('Warning: value is NULL', `Content Type: ${contentType}`);
      });
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
  describe('#convertValueBasedOnAttributeName', () => {
    it('should fail when list of images could not be decoded', () => {
      let exceptionMessage = null;
      let documentImages = null;
      try {
        documentImages = AttributeConverter
          .convertValueBasedOnAttributeName(
            {},
            constants.ATTR_DOCUMENT_IMAGES
          );
      } catch (err) {
        exceptionMessage = err.message;
      }

      expect(exceptionMessage).to.equal('Document Images could not be decoded');
      expect(documentImages).to.equal(null);
    });
  });
  describe('Document Images', () => {
    it('should be immutable', () => {
      const documentImages = AttributeConverter
        .convertValueBasedOnAttributeName(
          convertSampleMultiValue(),
          constants.ATTR_DOCUMENT_IMAGES
        );

      // Attempt to change a document image.
      documentImages[0] = 'not allowed';

      expect(documentImages.length).to.equal(2);
      expect(documentImages[0]).to.be.instanceOf(ImageJpeg);
      expect(documentImages[0].getMimeType()).to.equal('image/jpeg');
    });
  });
});
