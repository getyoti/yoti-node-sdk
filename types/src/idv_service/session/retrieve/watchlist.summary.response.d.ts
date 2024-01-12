export = WatchlistSummaryResponse;
declare class WatchlistSummaryResponse {
    constructor(summary: any);
    /** @private */
    private totalHits;
    /** @private */
    private associatedCountryCodes;
    /** @private */
    private rawResults;
    /**
     * @returns {number}
     */
    getTotalHits(): number;
    /**
     * @returns {string[]}
     */
    getAssociatedCountryCodes(): string[];
    /**
     * @returns {RawResultsResponse}
     */
    getRawResults(): RawResultsResponse;
}
import RawResultsResponse = require("./raw.results.response");
