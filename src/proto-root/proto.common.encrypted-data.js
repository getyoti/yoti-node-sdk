'use strict';

module.exports = {

  decodeEncryptedData(binaryData) {
    const decodedData = this.builder.lookup('compubapi_v1.EncryptedData').decode(binaryData);
    decodedData.cipherText = decodedData.cipherText.toString('base64');
    decodedData.iv = decodedData.iv.toString('base64');
    return decodedData;
  },

  encodeEncryptedData(notificationData) {
    return this.builder.lookup('compubapi_v1.EncryptedData').encode(notificationData).finish();
  },
};
