export = RequestedFuzzyMatchingStrategy;
/**
 *
 * @class RequestedFuzzyMatchingStrategy
 */
declare class RequestedFuzzyMatchingStrategy extends RequestedCaMatchingStrategy {
    constructor(fuzziness?: number);
    fuzziness: number;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
import RequestedCaMatchingStrategy = require("./requested.ca.matching.strategy");
