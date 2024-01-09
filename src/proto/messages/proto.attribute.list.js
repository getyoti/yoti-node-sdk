'use strict';

const { AttributeList } = require('../types');

/**
 * @typedef {import('../types').Attribute} Attribute
 */

/**
 * @typedef {import('protobufjs').Message} Message
 */

module.exports = {

  /**
   * Decode all attributes.
   *
   * @param {Buffer} binaryData
   *
   * @returns {{attributes: Attribute[]}}
   */
  decodeAttributeList(binaryData) {
    return /** @type {any} */ (AttributeList.decode(binaryData));
  },

  encodeAttributeList(attributesData) {
    return AttributeList.encode({ attributes: attributesData }).finish();
  },
};
