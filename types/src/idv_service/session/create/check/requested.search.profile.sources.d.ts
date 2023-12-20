export = RequestedSearchProfileSources;
/**
 *
 * @class RequestedSearchProfileSources
 */
declare class RequestedSearchProfileSources extends RequestedCaSources {
    /**
     * @param searchProfile {string}
     *
     */
    constructor(searchProfile: string);
    searchProfile: string;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
import RequestedCaSources = require("./requested.ca.sources");
