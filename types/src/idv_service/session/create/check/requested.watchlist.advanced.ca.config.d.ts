export = RequestedWatchlistAdvancedCaConfig;
/**
 * @typedef {import('./requested.watchlist.advanced.ca.check')} RequestedWatchlistAdvancedCaCheck
 */
/**
 * The base configuration applied when creating a {@link RequestedWatchlistAdvancedCaCheck}
 *
 * @class RequestedWatchlistAdvancedCaConfig
 */
declare class RequestedWatchlistAdvancedCaConfig {
    /**
     *
     * @param removeDeceased {boolean}
     * @param shareUrl {boolean}
     * @param sources {RequestedCaSources}
     * @param matchingStrategy {RequestedCaMatchingStrategy}
     */
    constructor(removeDeceased: boolean, shareUrl: boolean, sources: RequestedCaSources, matchingStrategy: RequestedCaMatchingStrategy);
    removeDeceased: boolean;
    shareUrl: boolean;
    sources: RequestedCaSources;
    matchingStrategy: RequestedCaMatchingStrategy;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
declare namespace RequestedWatchlistAdvancedCaConfig {
    export { RequestedWatchlistAdvancedCaCheck };
}
import RequestedCaSources = require("./requested.ca.sources");
import RequestedCaMatchingStrategy = require("./requested.ca.matching.strategy");
type RequestedWatchlistAdvancedCaCheck = import('./requested.watchlist.advanced.ca.check');
