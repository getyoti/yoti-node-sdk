import Validation = require('../../../yoti_common/validation');
import CaMatchingStrategyResponse = require('./ca.matching.strategy.response');

class ExactMatchingStrategyResponse extends CaMatchingStrategyResponse {
  constructor(matchingStrategy) {
    super(matchingStrategy);

    Validation.isBoolean(matchingStrategy.exact_match, 'exact_match');
    /** @private */
    this.exactMatch = matchingStrategy.exact_match;
  }

  /**
   *
   * @return {number}
   */
  isExactMatch() {
    return this.exactMatch;
  }
}

export default ExactMatchingStrategyResponse;
