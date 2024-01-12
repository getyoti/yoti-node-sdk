export = RequestedFuzzyMatchingStrategyBuilder;
/**
 * Builder to assist creation of {@link RequestedFuzzyMatchingStrategy}.
 *
 * @class RequestedFuzzyMatchingStrategyBuilder
 */
declare class RequestedFuzzyMatchingStrategyBuilder {
    /**
     * Sets fuzziness used for matching strategy
     *
     * @param fuzziness {number}
     *
     * @returns {this}
     */
    withFuzziness(fuzziness: number): this;
    fuzziness: number;
    /**
     *
     * @return {RequestedFuzzyMatchingStrategy}
     */
    build(): RequestedFuzzyMatchingStrategy;
}
import RequestedFuzzyMatchingStrategy = require("./requested.fuzzy.matching.strategy");
