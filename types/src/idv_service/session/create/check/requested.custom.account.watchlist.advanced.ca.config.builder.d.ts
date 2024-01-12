export = RequestedCustomAccountWatchlistAdvancedCaConfigBuilder;
/**
 * Builder to assist creation of {@link RequestedCustomAccountWatchlistAdvancedCaConfig}.
 *
 * @class RequestedWatchlistScreeningConfig
 */
declare class RequestedCustomAccountWatchlistAdvancedCaConfigBuilder extends RequestedWatchlistAdvancedCaConfigBuilder {
    /**
     * Sets monitoring used for custom account watchlist advanced ca
     *
     * @param apiKey {string}
     *
     * @returns {this}
     */
    withApiKey(apiKey: string): this;
    apiKey: string;
    /**
     * Sets monitoring used for custom account watchlist advanced ca
     *
     * @param monitoring {boolean}
     *
     * @returns {this}
     */
    withMonitoring(monitoring: boolean): this;
    monitoring: boolean;
    /**
     * Sets tags used for custom account watchlist advanced ca
     *
     * @param tags {object}
     *
     * @returns {this}
     */
    withTags(tags: object): this;
    tags: any;
    /**
     * Sets monitoring used for custom account watchlist advanced ca
     *
     * @param clientRef {string}
     *
     * @returns {this}
     */
    withClientRef(clientRef: string): this;
    clientRef: string;
    /**
     *
     * @return {RequestedCustomAccountWatchlistAdvancedCaConfig}
     */
    build(): RequestedCustomAccountWatchlistAdvancedCaConfig;
}
import RequestedWatchlistAdvancedCaConfigBuilder = require("./requested.watchlist.advanced.ca.config.builder");
import RequestedCustomAccountWatchlistAdvancedCaConfig = require("./requested.custom.account.watchlist.advanced.ca.config");
