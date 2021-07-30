'use strict';

const Validation = require('../../../../yoti_common/validation');
const RequestedFuzzyMatchingStrategy = require('./requested.fuzzy.matching.strategy');

/**
 * Builder to assist creation of {@link RequestedFuzzyMatchingStrategy}.
 *
 * @class RequestedFuzzyMatchingStrategyBuilder
 */
class RequestedFuzzyMatchingStrategyBuilder {
  /**
   * Sets fuzziness used for matching strategy
   *
   * @param fuzziness {number}
   *
   * @returns {this}
   */
  withFuzziness(fuzziness) {
    Validation.isNumber(fuzziness, 'fuzziness');
    Validation.withinRange(fuzziness, 0, 1, 'fuzziness');
    this.fuzziness = fuzziness;
    return this;
  }

  /**
   *
   * @return {RequestedFuzzyMatchingStrategy}
   */
  build() {
    return new RequestedFuzzyMatchingStrategy(this.fuzziness);
  }
}

module.exports = RequestedFuzzyMatchingStrategyBuilder;
