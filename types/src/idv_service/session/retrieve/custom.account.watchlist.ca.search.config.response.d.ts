export = CustomAccountWatchlistCaSearchConfigResponse;
declare class CustomAccountWatchlistCaSearchConfigResponse extends WatchlistAdvancedCaSearchConfigResponse {
    /** @private */
    private apiKey;
    /** @private */
    private monitoring;
    /** @private */
    private tags;
    /** @private */
    private clientRef;
    /**
     *
     * @return {string}
     */
    getApiKey(): string;
    /**
     *
     * @return {boolean}
     */
    isMonitoring(): boolean;
    /**
     *
     * @return {{[x: string]: string}}
     */
    getTags(): {
        [x: string]: string;
    };
    /**
     *
     * @return {string}
     */
    getClientRef(): string;
}
import WatchlistAdvancedCaSearchConfigResponse = require("./watchlist.advanced.ca.search.config.response");
