'use strict';

const { EncryptedData } = require('../types');

module.exports = {

  /**
   * @param {Uint8Array} binaryData
   * @returns {{cipherText: string, iv: string}}
   */
  decodeEncryptedData(binaryData) {
    const decodedData = /** @type {{cipherText: Buffer, iv: Buffer}} */(
    /** @type {*} */(EncryptedData.decode(binaryData)));
    return {
      cipherText: decodedData.cipherText.toString('base64'),
      iv: decodedData.iv.toString('base64'),
    };
  },

  encodeEncryptedData(notificationData) {
    return EncryptedData.encode(notificationData).finish();
  },
};
