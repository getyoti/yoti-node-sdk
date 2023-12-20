export = RequestedWatchlistAdvancedCaConfigBuilder;
/**
 * The base Builder to assist the creation of {@link RequestedWatchlistAdvancedCaConfig}.
 *
 * @class RequestedWatchlistAdvancedCaConfigBuilder
 */
declare class RequestedWatchlistAdvancedCaConfigBuilder {
    /**
     * Sets removeDeceased used for watchlist advanced ca
     *
     * @param removeDeceased {boolean}
     *
     * @returns {this}
     */
    withRemoveDeceased(removeDeceased: boolean): this;
    removeDeceased: boolean;
    /**
     * Sets shareUrl used for watchlist advanced ca
     *
     * @param shareUrl {boolean}
     *
     * @returns {this}
     */
    withShareUrl(shareUrl: boolean): this;
    shareUrl: boolean;
    /**
     * Sets sources used for watchlist advanced ca
     *
     * @param sources {RequestedCaSources}
     *
     * @returns {this}
     */
    withSources(sources: RequestedCaSources): this;
    sources: RequestedCaSources;
    /**
     * Sets matchingStrategy used for watchlist advanced ca
     *
     * @param matchingStrategy  {RequestedCaMatchingStrategy}
     *
     * @returns {this}
     */
    withMatchingStrategy(matchingStrategy: RequestedCaMatchingStrategy): this;
    matchingStrategy: RequestedCaMatchingStrategy;
}
import RequestedCaSources = require("./requested.ca.sources");
import RequestedCaMatchingStrategy = require("./requested.ca.matching.strategy");
