export = RequestedCustomAccountWatchlistAdvancedCaConfig;
/**
 * @typedef {import('./requested.watchlist.advanced.ca.check')} RequestedWatchlistAdvancedCaCheck
 * @typedef {import('./requested.ca.sources')} RequestedCaSources
 * @typedef {import('./requested.ca.matching.strategy')} RequestedCaMatchingStrategy
 */
/**
 * The configuration applied when creating a {@link RequestedWatchlistAdvancedCaCheck}
 * with custom account
 *
 * @class RequestedCustomAccountWatchlistAdvancedCaConfig
 */
declare class RequestedCustomAccountWatchlistAdvancedCaConfig extends RequestedWatchlistAdvancedCaConfig {
    /**
     *
     * @param removeDeceased {boolean}
     * @param shareUrl {boolean}
     * @param sources {RequestedCaSources}
     * @param matchingStrategy {RequestedCaMatchingStrategy}
     * @param apiKey {string}
     * @param monitoring {boolean}
     * @param tags {object}
     * @param clientRef {string}
     */
    constructor(removeDeceased: boolean, shareUrl: boolean, sources: RequestedCaSources, matchingStrategy: RequestedCaMatchingStrategy, apiKey: string, monitoring: boolean, tags: object, clientRef: string);
    /** @private */
    private apiKey;
    /** @private */
    private monitoring;
    /** @private */
    private tags;
    /** @private */
    private clientRef;
}
declare namespace RequestedCustomAccountWatchlistAdvancedCaConfig {
    export { RequestedWatchlistAdvancedCaCheck, RequestedCaSources, RequestedCaMatchingStrategy };
}
import RequestedWatchlistAdvancedCaConfig = require("./requested.watchlist.advanced.ca.config");
type RequestedWatchlistAdvancedCaCheck = import('./requested.watchlist.advanced.ca.check');
type RequestedCaSources = import('./requested.ca.sources');
type RequestedCaMatchingStrategy = import('./requested.ca.matching.strategy');
