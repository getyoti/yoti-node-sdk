'use strict';

const ProtoBuf = require('protobufjs');

const UNDEFINED = 0;
const STRING = 1;
const JPEG = 2;
const DATE = 3;
const PNG = 4;

module.exports.toCamelCase = str => ProtoBuf.Util.toCamelCase(str);

module.exports.convertValueBasedOnContentType = (value, contentType) => {
  switch (contentType) {
    // UNDEFINED should not be seen, and is used as an error placeholder
    case UNDEFINED:
      throw new Error('Wrong content type');
    case STRING: // STRING means the value is UTF-8 encoded text.
    case DATE: // Date as string in RFC3339 format (YYYY-MM-DD).
      return value.toUTF8();
    default:
      return value;
  }
};

module.exports.imageUriBasedOnContentType = (value, contentType) => {
  switch (contentType) {
    // JPEG indicates a standard .jpeg image.
    case JPEG:
      return `data:image/jpeg;base64,${value.toBase64()}`;
    // PNG indicates a standard .png image.
    case PNG:
      return `data:image/png;base64,${value.toBase64()}`;
    default:
      return value.toBase64();
  }
};
