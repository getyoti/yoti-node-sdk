export = RequestedWatchlistAdvancedCaCheckBuilder;
/**
 * Builder to assist the creation of {@link RequestedWatchlistAdvancedCaCheck}.
 *
 * @class RequestedWatchlistAdvancedCaCheckBuilder
 */
declare class RequestedWatchlistAdvancedCaCheckBuilder {
    /**
     *
     * @param config {RequestedWatchlistAdvancedCaConfig}
     *
     * @returns {this}
     */
    withConfig(config: RequestedWatchlistAdvancedCaConfig): this;
    config: RequestedWatchlistAdvancedCaConfig;
    build(): RequestedWatchlistAdvancedCaCheck;
}
import RequestedWatchlistAdvancedCaConfig = require("./requested.watchlist.advanced.ca.config");
import RequestedWatchlistAdvancedCaCheck = require("./requested.watchlist.advanced.ca.check");
