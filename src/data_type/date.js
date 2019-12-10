const Validation = require('../yoti_common/validation');

/**
 * Formats date part padded with leading zeros.
 *
 * @param {*} part
 * @param {number} length
 *
 * @returns {string}
 *   Date part with leading zeros, e.g. `04`
 */
function formatDatePart(part, length) {
  const padding = length - part.toString().length;
  const zeros = '0'.repeat(padding > 0 ? padding : 0);
  return `${zeros}${part}`;
}

/**
 * Adds microseconds to seconds and format with leading zeros.
 *
 * @param {number} seconds
 * @param {number} microseconds
 *
 * @returns {string}
 *   Seconds with microseconds in format `{SS}.{mmmmmm}`
 */
function formatSecondsWithMicroseconds(seconds, microseconds) {
  const secondsWithMicroseconds = (seconds + (microseconds / 1000000));
  return formatDatePart(secondsWithMicroseconds.toFixed(6), 9);
}

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
    Validation.isNumber(timestamp);
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

  /**
   * Time with microseconds.
   *
   * @returns {string}
   *   Time in format `{HH}:{MM}:{SS}.{mmmmmm}`
   */
  getMicrosecondTime() {
    const hours = formatDatePart(this.getUTCHours(), 2);
    const minutes = formatDatePart(this.getUTCMinutes(), 2);
    const secondsMicroseconds = formatSecondsWithMicroseconds(
      this.getUTCSeconds(),
      this.getMicroseconds()
    );
    return `${hours}:${minutes}:${secondsMicroseconds}`;
  }

  /**
   * Returns ISO 8601 UTC date.
   *
   * @returns {string}
   *   Date in format `{YYYY}-{MM}-{DD}`
   */
  toISODateString() {
    const year = formatDatePart(this.getUTCFullYear(), 4);
    const month = formatDatePart(this.getUTCMonth() + 1, 2);
    const day = formatDatePart(this.getUTCDate(), 2);
    return `${year}-${month}-${day}`;
  }

  /**
   * @param {string} dateString
   */
  static fromDateString(dateString) {
    Validation.isString(dateString, 'dateString');

    const milliseconds = Date.parse(dateString);
    if (Number.isNaN(milliseconds)) {
      throw new TypeError(`${dateString} is not a valid date string`);
    }

    return new YotiDate(milliseconds * 1000);
  }

  /**
   * Returns ISO 8601 UTC timestamp with microseconds.
   *
   * @returns {string}
   *   Timestamp in format `{YYYY}-{MM}-{DD}T{HH}:{MM}:{SS}.{mmmmmm}Z`
   */
  getMicrosecondTimestamp() {
    return `${this.toISODateString()}T${this.getMicrosecondTime()}Z`;
  }
}

module.exports = {
  YotiDate,
};
