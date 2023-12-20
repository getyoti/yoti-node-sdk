export = FuzzyMatchingStrategyResponse;
declare class FuzzyMatchingStrategyResponse extends CaMatchingStrategyResponse {
    fuzziness: any;
    /**
     *
     * @return {number}
     */
    getFuzziness(): number;
}
import CaMatchingStrategyResponse = require("./ca.matching.strategy.response");
