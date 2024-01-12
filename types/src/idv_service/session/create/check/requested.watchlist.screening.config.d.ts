export = RequestedWatchlistScreeningConfig;
/**
 * The configuration applied when creating a RequestedWatchlistScreeningCheck
 *
 * @class RequestedWatchlistScreeningConfig
 */
declare class RequestedWatchlistScreeningConfig {
    /**
     * @param {string[]} categories
     *   The list of categories corresponding to each watchlist screening conducted
     */
    constructor(categories: string[]);
    /** @private */
    private categories;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
