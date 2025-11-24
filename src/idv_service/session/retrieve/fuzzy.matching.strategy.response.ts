import Validation = require('../../../yoti_common/validation');
import CaMatchingStrategyResponse = require('./ca.matching.strategy.response');

class FuzzyMatchingStrategyResponse extends CaMatchingStrategyResponse {
  constructor(matchingStrategy) {
    super(matchingStrategy);

    Validation.isNumber(matchingStrategy.fuzziness, 'fuzziness');
    /** @private */
    this.fuzziness = matchingStrategy.fuzziness;
  }

  /**
   *
   * @return {number}
   */
  getFuzziness() {
    return this.fuzziness;
  }
}

export default FuzzyMatchingStrategyResponse;
