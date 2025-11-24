import Validation = require('../../../yoti_common/validation');
import CaSourcesResponse = require('./ca.sources.response');

class TypeListSourcesResponse extends CaSourcesResponse {
  constructor(sources) {
    super(sources);

    Validation.isArrayOfStrings(sources.types, 'types');
    /** @private */
    this.types = sources.types;
  }

  /**
   *
   * @return {string[]}
   */
  getTypes() {
    return this.types;
  }
}

export default TypeListSourcesResponse;
