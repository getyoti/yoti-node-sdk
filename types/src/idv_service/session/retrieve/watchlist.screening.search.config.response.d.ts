export = WatchlistScreeningSearchConfigResponse;
declare class WatchlistScreeningSearchConfigResponse extends WatchlistSearchConfigResponse {
    constructor(searchConfig: any);
    /** @private */
    private categories;
    /**
     * @returns {string[]}
     */
    getCategories(): string[];
}
import WatchlistSearchConfigResponse = require("./watchlist.search.config.response");
