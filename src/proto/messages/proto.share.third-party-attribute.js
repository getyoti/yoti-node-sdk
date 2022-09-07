'use strict';

const { ThirdPartyAttribute } = require('../types');

module.exports = {
  decodeThirdPartyAttribute(binaryData) {
    return ThirdPartyAttribute.decode(Buffer.from(binaryData, 'base64'));
  },
};
