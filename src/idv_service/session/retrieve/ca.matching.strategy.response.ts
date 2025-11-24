import { EXACT, FUZZY } from '../../idv.constants';
import Validation = require('../../../yoti_common/validation');

const types = {
  EXACT,
  FUZZY,
};

class CaMatchingStrategyResponse {
  constructor(matchingStrategy) {
    const currentClass = new.target;
    if (currentClass === CaMatchingStrategyResponse) {
      throw new Error('CaMatchingStrategyResponse can not be instantiated');
    }

    Validation.isString(matchingStrategy.type, 'type');
    Validation.oneOf(matchingStrategy.type, Object.keys(types), 'type');
    /** @private */
    this.type = matchingStrategy.type;
  }

  /**
   *
   * @return {string}
   */
  getType() {
    return this.type;
  }
}

CaMatchingStrategyResponse.types = types;

export default CaMatchingStrategyResponse;
