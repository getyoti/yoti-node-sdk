'use strict';

const { AttributeList } = require('../types');

/**
 * @typedef {import('../types').Attribute} Attribute
 */

module.exports = {

  /**
   * Decode all attributes.
   *
   * @param {Uint8Array} binaryData
   *
   * @returns {{attributes: Attribute[]}}
   */
  decodeAttributeList(binaryData) {
    const { attributes } = /** @type {{attributes: Attribute[]}} */ (
      /** @type {*} */(AttributeList.decode(binaryData)));
    return { attributes };
  },

  encodeAttributeList(attributesData) {
    return AttributeList.encode({ attributes: attributesData }).finish();
  },
};
