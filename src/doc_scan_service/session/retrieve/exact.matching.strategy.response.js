'use strict';

const Validation = require('../../../yoti_common/validation');
const CaMatchingStrategyResponse = require('./ca.matching.strategy.response');

class ExactMatchingStrategyResponse extends CaMatchingStrategyResponse {
  constructor(matchingStrategy) {
    super(matchingStrategy);

    Validation.isBoolean(matchingStrategy.exact_match, 'exact_match');
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

module.exports = ExactMatchingStrategyResponse;
