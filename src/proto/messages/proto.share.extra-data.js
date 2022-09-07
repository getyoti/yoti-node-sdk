'use strict';

const { ExtraData } = require('../types');

module.exports = {
  decodeExtraData(binaryData) {
    return ExtraData.decode(Buffer.from(binaryData, 'base64'));
  },
};
