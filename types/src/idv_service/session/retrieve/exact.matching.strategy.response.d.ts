export = ExactMatchingStrategyResponse;
declare class ExactMatchingStrategyResponse extends CaMatchingStrategyResponse {
    /** @private */
    private exactMatch;
    /**
     *
     * @return {number}
     */
    isExactMatch(): number;
}
import CaMatchingStrategyResponse = require("./ca.matching.strategy.response");
