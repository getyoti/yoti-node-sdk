export = RequestedExactMatchingStrategy;
/**
 *
 * @class RequestedExactMatchingStrategy
 */
declare class RequestedExactMatchingStrategy extends RequestedCaMatchingStrategy {
    constructor();
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
import RequestedCaMatchingStrategy = require("./requested.ca.matching.strategy");
