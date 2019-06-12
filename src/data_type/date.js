/**
 * Date object with microsecond accuracy.
 *
 * @class YotiDate
 */
class YotiDate extends Date {
  /**
   * @param {number} timestamp
   */
  constructor(timestamp) {
    super(Math.round(timestamp / 1000));
    this.microseconds = timestamp % 1000000;
  }

  /**
   * Returns a number, between 0 and 999999, representing the microseconds.
   *
   * @returns {number}
   */
  getMicroseconds() {
    return this.microseconds;
  }
}

module.exports = {
  YotiDate,
};
