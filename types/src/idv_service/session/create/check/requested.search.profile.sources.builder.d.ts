export = RequestedSearchProfileSourcesBuilder;
/**
 * Builder to assist the creation of {@link RequestedSearchProfileSources}.
 *
 * @class RequestedSearchProfileSourcesBuilder
 */
declare class RequestedSearchProfileSourcesBuilder {
    /**
     * Sets searchProfile used for sources
     *
     * @param searchProfile {string}
     *
     * @returns {this}
     */
    withSearchProfile(searchProfile: string): this;
    searchProfile: string;
    /**
     *
     * @return {RequestedSearchProfileSources}
     */
    build(): RequestedSearchProfileSources;
}
import RequestedSearchProfileSources = require("./requested.search.profile.sources");
