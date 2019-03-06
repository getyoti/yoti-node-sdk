'use strict';

const constants = require('./constants');
const { DocumentDetails } = require('../data_type/document.details');
const ImagePng = require('../data_type/image.png');
const ImageJpeg = require('../data_type/image.jpeg');
const protoRoot = require('../proto-root');

const CONTENT_TYPE_UNDEFINED = 0;
const CONTENT_TYPE_STRING = 1;
const CONTENT_TYPE_JPEG = 2;
const CONTENT_TYPE_DATE = 3;
const CONTENT_TYPE_PNG = 4;
const CONTENT_TYPE_BYTES = 5;
const CONTENT_TYPE_MULTI_VALUE = 6;

module.exports.AttributeConverter = class AttributeConverter {
  static convertValueBasedOnAttributeName(value, attrName) {
    if (!value) {
      return null;
    }

    switch (attrName) {
      case constants.ATTR_DOCUMENT_DETAILS:
        return new DocumentDetails(value);
      default:
        return value;
    }
  }

  static convertValueBasedOnContentType(value, contentType) {
    if (!value) {
      return null;
    }

    switch (contentType) {
      // UNDEFINED should not be seen, and is used as an error placeholder
      case CONTENT_TYPE_UNDEFINED:
        throw new Error('Wrong content type');
      case CONTENT_TYPE_STRING: // STRING means the value is UTF-8 encoded text.
      case CONTENT_TYPE_DATE: // Date as string in RFC3339 format (YYYY-MM-DD).
        return value.toUTF8();
      case CONTENT_TYPE_BYTES: {
        // Convert ByteArray to JSON
        const attrValue = Buffer.from(value.toArrayBuffer()).toString();
        return JSON.parse(attrValue);
      }
      case CONTENT_TYPE_JPEG:
        return new ImageJpeg(value);
      case CONTENT_TYPE_PNG:
        return new ImagePng(value);
      case CONTENT_TYPE_MULTI_VALUE: {
        // Decode multi value.
        const protoInst = protoRoot.initializeProtoBufObjects();
        const multiValue = protoInst.builder.attrpubapi_v1.MultiValue.decode(value);
        // Build array of attribute values.
        const multiValueArray = [];
        multiValue.values.forEach((multiValueItem) => {
          multiValueArray.push(AttributeConverter.convertValueBasedOnContentType(
            Buffer.from(multiValueItem.data.toArrayBuffer()),
            multiValueItem.contentType
          ));
        });
        return multiValueArray;
      }
      default:
        return value;
    }
  }
};
