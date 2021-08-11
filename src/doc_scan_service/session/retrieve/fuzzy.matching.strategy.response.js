'use strict';

const Validation = require('../../../yoti_common/validation');
const CaMatchingStrategyResponse = require('./ca.matching.strategy.response');

class FuzzyMatchingStrategyResponse extends CaMatchingStrategyResponse {
  constructor(matchingStrategy) {
    super(matchingStrategy);

    Validation.isNumber(matchingStrategy.fuzziness, 'fuzziness');
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

module.exports = FuzzyMatchingStrategyResponse;
