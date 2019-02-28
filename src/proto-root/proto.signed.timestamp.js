'use strict';

module.exports = {

  decodeSignedTimeStamp(binaryData) {
    return this.builder.compubapi_v1.SignedTimestamp.decode(binaryData);
  },

  encodeSignedTimeStamp(notificationData) {
    return new this.builder.compubapi_v1.SignedTimestamp(notificationData).toArrayBuffer();
  },
};
