/**
 * Date object with microsecond accuracy.
 *
 * @class YotiDate
 */
export class YotiDate extends Date {
    /**
     * @param {string} dateString
     */
    static fromDateString(dateString: string): YotiDate;
    /**
     * @param {number} timestamp
     */
    constructor(timestamp: number);
    /** @private */
    private microseconds;
    /** @private */
    private microsecondUnixTimestamp;
    /**
     * Returns a number, between 0 and 999999, representing the microseconds.
     *
     * @returns {number}
     */
    getMicroseconds(): number;
    /**
     * Time with microseconds.
     *
     * @returns {string}
     *   Time in format `{HH}:{MM}:{SS}.{mmmmmm}`
     */
    getMicrosecondTime(): string;
    /**
     * Returns ISO 8601 UTC date.
     *
     * @returns {string}
     *   Date in format `{YYYY}-{MM}-{DD}`
     */
    toISODateString(): string;
    /**
     * Returns ISO 8601 UTC timestamp with microseconds.
     *
     * @returns {string}
     *   Timestamp in format `{YYYY}-{MM}-{DD}T{HH}:{MM}:{SS}.{mmmmmm}Z`
     */
    getMicrosecondTimestamp(): string;
    /**
     * Returns Unix timestamp with microseconds.
     *
     * @returns {number}
     */
    getMicrosecondUnixTimestamp(): number;
}
