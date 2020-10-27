'use strict';

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
 * @param {string} dateString
 *
 * @returns {number}
 */
function extractMicrosecondsFromDateString(dateString) {
  const secondsFractionMatch = dateString.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.(\d+)[Z|+|-]/);

  if (secondsFractionMatch === null) {
    return 0;
  }

  const secondsFraction = secondsFractionMatch[1].slice(0, 6);
  const zeros = '0'.repeat(6 - secondsFraction.length);
  return parseInt(`${secondsFraction}${zeros}`, 10);
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
 * Extract microseconds from provided timestamp.
 *
 * Examples:
 *   - Signed integer -1571630945999999 will have 1 microsecond.
 *   - 1571630945999999 will have 999999 microseconds.
 *
 * @param {number} timestamp
 *
 * @returns {number}
 */
function extractMicrosecondsFromTimestamp(timestamp) {
  let microseconds = timestamp % 1000000;
  if (microseconds < 0) {
    microseconds += 1000000;
  }
  return microseconds;
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
    super(Math.floor(timestamp / 1000));
    this.microseconds = extractMicrosecondsFromTimestamp(timestamp);
    this.microsecondUnixTimestamp = timestamp;
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

    const flooredTimestamp = Math.floor(milliseconds / 1000) * 1000000;
    const microseconds = extractMicrosecondsFromDateString(dateString);

    return new YotiDate(flooredTimestamp + microseconds);
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

  /**
   * Returns Unix timestamp with microseconds.
   *
   * @returns {int}
   */
  getMicrosecondUnixTimestamp() {
    return this.microsecondUnixTimestamp;
  }
}

module.exports = {
  YotiDate,
};
