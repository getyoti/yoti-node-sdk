export = WatchlistAdvancedCaSearchConfigResponse;
declare class WatchlistAdvancedCaSearchConfigResponse extends WatchlistSearchConfigResponse {
    constructor(searchConfig: any);
    /** @private */
    private type;
    /** @private */
    private removeDeceased;
    /** @private */
    private shareUrl;
    /** @private */
    private sources;
    /** @private */
    private matchingStrategy;
    /**
     * @returns {string}
     */
    getType(): string;
    /**
     * @returns {boolean}
     */
    isRemoveDeceased(): boolean;
    /**
     * @returns {boolean}
     */
    isShareUrl(): boolean;
    /**
     * @returns {CaSourcesResponse}
     */
    getSources(): CaSourcesResponse;
    /**
     * @returns {CaMatchingStrategyResponse}
     */
    getMatchingStrategy(): CaMatchingStrategyResponse;
}
declare namespace WatchlistAdvancedCaSearchConfigResponse {
    export { types };
}
import WatchlistSearchConfigResponse = require("./watchlist.search.config.response");
import CaSourcesResponse = require("./ca.sources.response");
import CaMatchingStrategyResponse = require("./ca.matching.strategy.response");
declare namespace types {
    export { WITH_YOTI_ACCOUNT };
    export { WITH_CUSTOM_ACCOUNT };
}
import { WITH_YOTI_ACCOUNT } from "../../idv.constants";
import { WITH_CUSTOM_ACCOUNT } from "../../idv.constants";
