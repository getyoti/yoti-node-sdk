export = SearchProfileSourcesResponse;
declare class SearchProfileSourcesResponse extends CaSourcesResponse {
    /** @private */
    private searchProfile;
    /**
     *
     * @return {string}
     */
    getSearchProfile(): string;
}
import CaSourcesResponse = require("./ca.sources.response");
