export = CustomAccountWatchlistCaSearchConfigResponse;
declare class CustomAccountWatchlistCaSearchConfigResponse extends WatchlistAdvancedCaSearchConfigResponse {
    apiKey: any;
    monitoring: any;
    tags: any;
    clientRef: any;
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
     * @return {string:string}
     */
    getTags(): string;
    /**
     *
     * @return {string}
     */
    getClientRef(): string;
}
import WatchlistAdvancedCaSearchConfigResponse = require("./watchlist.advanced.ca.search.config.response");
