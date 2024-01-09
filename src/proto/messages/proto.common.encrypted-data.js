'use strict';

const { EncryptedData } = require('../types');

/**
 * @typedef {import('protobufjs').Message} Message
 */

module.exports = {

  /**
   * @param {Uint8Array} binaryData
   * @returns {Message<{cipherText: string, iv: string}>}
   */
  decodeEncryptedData(binaryData) {
    /** @type {Message<{cipherText: string, iv: string}>} */
    const decodedData = EncryptedData.decode(binaryData);
    decodedData.cipherText = decodedData.cipherText.toString('base64');
    decodedData.iv = decodedData.iv.toString('base64');
    return decodedData;
  },

  encodeEncryptedData(notificationData) {
    return EncryptedData.encode(notificationData).finish();
  },
};
