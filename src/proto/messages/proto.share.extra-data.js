'use strict';

const { ExtraData } = require('../types');

module.exports = {
  /**
   * @param {*} binaryData
   * @returns {{list: Array}}
   */
  decodeExtraData(binaryData) {
    const { list } = /** @type {{list: Array}} */ (
      /** @type {*} */ (ExtraData.decode(Buffer.from(binaryData, 'base64'))));
    return { list };
  },
};
