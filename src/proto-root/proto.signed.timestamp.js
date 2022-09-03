'use strict';

module.exports = {

  decodeSignedTimeStamp(binaryData) {
    return this.builder.lookup('compubapi_v1.SignedTimestamp').decode(binaryData);
  },

  encodeSignedTimeStamp(notificationData) {
    return this.builder.lookup('compubapi_v1.SignedTimestamp').encode(notificationData).finish();
  },
};
