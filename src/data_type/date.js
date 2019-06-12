/**
 * Formats date part with zero padding.
 *
 * @param {*} part
 * @param {number} length
 */
function formatDatePart(part, length) {
  return part.toString().padStart(length, '0');
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
    const minutes = formatDatePart(this.getUTCMinutes());
    const secondsWithMicroseconds = (this.getUTCSeconds() + (this.getMicroseconds() / 1000000))
      .toFixed(6)
      .padStart(9, '0');
    return `${hours}:${minutes}:${secondsWithMicroseconds}`;
  }

  /**
   * Returns ISO 8601 UTC timestamp with microseconds.
   *
   * @returns {string}
   *   Timestamp in format `{YYYY}-{DD}-{MM}T{HH}:{MM}:{SS}.{mmmmmm}Z`
   */
  getMicrosecondTimestamp() {
    const year = formatDatePart(this.getUTCFullYear(), 4);
    const month = formatDatePart(this.getUTCMonth(), 2);
    const day = formatDatePart(this.getUTCDate(), 2);
    return `${year}-${month}-${day}T${this.getMicrosecondTime()}Z`;
  }
}

module.exports = {
  YotiDate,
};
