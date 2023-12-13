export = WatchlistScreeningSearchConfigResponse;
declare class WatchlistScreeningSearchConfigResponse extends WatchlistSearchConfigResponse {
    constructor(searchConfig: any);
    categories: any;
    /**
     * @returns {string[]}
     */
    getCategories(): string[];
}
import WatchlistSearchConfigResponse = require("./watchlist.search.config.response");
