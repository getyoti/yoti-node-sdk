'use strict';

const ProtoBuf = require('protobufjs');

module.exports.toCamelCase = str => ProtoBuf.Util.toCamelCase(str);

module.exports.convertValueBasedOnContentType = (value, contentType) => {
  const UNDEFINED = 0;
  const STRING = 1;
  const JPEG = 2;
  const DATE = 3;
  const PNG = 4;

  switch (contentType) {
    // UNDEFINED should not be seen, and is used as an error placeholder
    case UNDEFINED:
      throw new Error('Wrong content type');
    // STRING means the value is UTF-8 encoded text.
    case STRING:
      return value.toUTF8();
    // JPEG indicates a standard .jpeg image.
    case JPEG:
      return `data:image/jpeg;base64,${value.toBase64()}`;
    // Date as string in RFC3339 format (YYYY-MM-DD).
    case DATE:
      return value.toUTF8();
    // PNG indicates a standard .png image.
    case PNG:
      return `data:image/png;base64,${value.toBase64()}`;
    default:
      return value;
  }
};
