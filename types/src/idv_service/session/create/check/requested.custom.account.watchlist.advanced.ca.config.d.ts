export = RequestedCustomAccountWatchlistAdvancedCaConfig;
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
    apiKey: string;
    monitoring: boolean;
    tags: any;
    clientRef: string;
}
import RequestedWatchlistAdvancedCaConfig = require("./requested.watchlist.advanced.ca.config");
