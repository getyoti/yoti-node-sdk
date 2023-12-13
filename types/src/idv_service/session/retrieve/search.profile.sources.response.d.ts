export = SearchProfileSourcesResponse;
declare class SearchProfileSourcesResponse extends CaSourcesResponse {
    searchProfile: any;
    /**
     *
     * @return {string}
     */
    getSearchProfile(): string;
}
import CaSourcesResponse = require("./ca.sources.response");
