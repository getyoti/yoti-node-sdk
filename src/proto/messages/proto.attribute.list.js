'use strict';

const { AttributeList } = require('../types');

module.exports = {

  /**
   * Decode all attributes.
   *
   * @param {Buffer} binaryData
   */
  decodeAttributeList(binaryData) {
    return AttributeList.decode(binaryData);
  },

  encodeAttributeList(attributesData) {
    return AttributeList.encode({ attributes: attributesData }).finish();
  },
};
