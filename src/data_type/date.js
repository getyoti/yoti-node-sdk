/**
 * Date object with microsecond accuracy.
 *
 * @class YotiDate
 */
class YotiDate extends Date {
  /**
   * @param {Number} timestamp
   */
  constructor(timestamp) {
    super(Math.round(timestamp / 1000));
    this.microseconds = timestamp % 1000000;
  }

  /**
   * Returns microseconds.
   *
   * @returns {Number}
   */
  getMicroseconds() {
    return this.microseconds;
  }
}

module.exports = {
  YotiDate,
};
