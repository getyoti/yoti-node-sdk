'use strict';

const { YotiDate } = require('./date');

/**
 * SignedTimestamp is a timestamp associated with a message that has a
 * cryptographic signature proving that it was issued by the correct authority.
 *
 * @class YotiSignedTimeStamp
 */
class YotiSignedTimeStamp {
  /**
   * @param {number} version
   * @param {YotiDate} timestamp
   */
  constructor(version, timestamp) {
    this.version = version;

    if (!(timestamp instanceof YotiDate)) {
      throw new TypeError('timestamp must be instance of YotiDate');
    }
    this.timestamp = timestamp;
  }

  /**
   * Version indicates how the digests within this object are calculated.
   *
   * @returns {number}
   */
  getVersion() { return this.version; }

  /**
   * The actual timestamp with microsecond-level accuracy.
   *
   * @returns {YotiDate}
   */
  getTimestamp() { return this.timestamp; }
}

module.exports = {
  YotiSignedTimeStamp,
};
