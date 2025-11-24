import { FUZZY } from '../../../idv.constants';
import Validation = require('../../../../yoti_common/validation');
import RequestedCaMatchingStrategy = require('./requested.ca.matching.strategy');

/**
 *
 * @class RequestedFuzzyMatchingStrategy
 */
class RequestedFuzzyMatchingStrategy extends RequestedCaMatchingStrategy {
  constructor(fuzziness = 0.5) {
    super(FUZZY);
    Validation.isNumber(fuzziness, 'fuzziness');
    Validation.withinRange(fuzziness, 0, 1, 'fuzziness');
    /** @private */
    this.fuzziness = fuzziness;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      type: this.type,
      fuzziness: this.fuzziness,
    };
  }
}

export default RequestedFuzzyMatchingStrategy;
