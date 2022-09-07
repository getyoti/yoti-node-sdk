'use strict';

const { SignedTimestamp } = require('../types');

module.exports = {

  decodeSignedTimeStamp(binaryData) {
    return SignedTimestamp.decode(binaryData);
  },

  encodeSignedTimeStamp(notificationData) {
    return SignedTimestamp.encode(notificationData).finish();
  },
};
