export = FuzzyMatchingStrategyResponse;
declare class FuzzyMatchingStrategyResponse extends CaMatchingStrategyResponse {
    /** @private */
    private fuzziness;
    /**
     *
     * @return {number}
     */
    getFuzziness(): number;
}
import CaMatchingStrategyResponse = require("./ca.matching.strategy.response");
