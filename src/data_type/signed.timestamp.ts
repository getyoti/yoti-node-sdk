import { YotiDate } from './date';

/**
 * SignedTimestamp is a timestamp associated with a message that has a
 * cryptographic signature proving that it was issued by the correct authority.
 *
 * @class YotiSignedTimeStamp
 */
class YotiSignedTimeStamp {
  private version: number;
  private timestamp: YotiDate;

  /**
   * @param {number} version
   * @param {YotiDate} timestamp
   */
  constructor(version: number, timestamp: YotiDate) {
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

export {
  YotiSignedTimeStamp,
};
