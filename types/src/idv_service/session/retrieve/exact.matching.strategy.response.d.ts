export = ExactMatchingStrategyResponse;
declare class ExactMatchingStrategyResponse extends CaMatchingStrategyResponse {
    exactMatch: any;
    /**
     *
     * @return {number}
     */
    isExactMatch(): number;
}
import CaMatchingStrategyResponse = require("./ca.matching.strategy.response");
