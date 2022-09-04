'use strict';

const { EncryptedData } = require('../types');

module.exports = {

  decodeEncryptedData(binaryData) {
    const decodedData = EncryptedData.decode(binaryData);
    decodedData.cipherText = decodedData.cipherText.toString('base64');
    decodedData.iv = decodedData.iv.toString('base64');
    return decodedData;
  },

  encodeEncryptedData(notificationData) {
    return EncryptedData.encode(notificationData).finish();
  },
};
