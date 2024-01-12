/**
 * SignedTimestamp is a timestamp associated with a message that has a
 * cryptographic signature proving that it was issued by the correct authority.
 *
 * @class YotiSignedTimeStamp
 */
export class YotiSignedTimeStamp {
    /**
     * @param {number} version
     * @param {YotiDate} timestamp
     */
    constructor(version: number, timestamp: YotiDate);
    /** @private */
    private version;
    /** @private */
    private timestamp;
    /**
     * Version indicates how the digests within this object are calculated.
     *
     * @returns {number}
     */
    getVersion(): number;
    /**
     * The actual timestamp with microsecond-level accuracy.
     *
     * @returns {YotiDate}
     */
    getTimestamp(): YotiDate;
}
import { YotiDate } from "./date";
