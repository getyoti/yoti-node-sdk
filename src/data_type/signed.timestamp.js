'use strict';

/**
 * SignedTimestamp is a timestamp associated with a message that has a
 * cryptographic signature proving that it was issued by the correct authority.
 *
 * @class YotiSignedTimeStamp
 */
class YotiSignedTimeStamp {
  constructor(timeStampObj) {
    this.version = timeStampObj.version;
    this.timestamp = timeStampObj.timestamp;
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
   * @returns {Date}
   */
  getTimestamp() { return this.timestamp; }
}

module.exports = {
  YotiSignedTimeStamp,
};
