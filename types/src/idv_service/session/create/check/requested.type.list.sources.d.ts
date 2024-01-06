export = RequestedTypeListSources;
/**
 *
 * @class RequestedSearchProfileSources
 */
declare class RequestedTypeListSources extends RequestedCaSources {
    /**
     * @param types {string[]}
     *
     */
    constructor(types?: string[]);
    /** @private */
    private types;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
import RequestedCaSources = require("./requested.ca.sources");
