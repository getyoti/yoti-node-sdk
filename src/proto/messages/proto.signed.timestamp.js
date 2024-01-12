'use strict';

const { SignedTimestamp } = require('../types');

module.exports = {
  /**
   * @param {Uint8Array} binaryData
   * @returns {{version: number, timestamp: number}}
   */
  decodeSignedTimeStamp(binaryData) {
    const { version, timestamp } = /** @type {{version: number, timestamp: number}} */ (
      /** @type {*} */(SignedTimestamp.decode(binaryData)));
    return { version, timestamp };
  },

  encodeSignedTimeStamp(notificationData) {
    return SignedTimestamp.encode(notificationData).finish();
  },
};
