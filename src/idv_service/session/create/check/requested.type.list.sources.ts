import { TYPE_LIST } from '../../../idv.constants';
import Validation = require('../../../../yoti_common/validation');
import RequestedCaSources = require('./requested.ca.sources');

/**
 *
 * @class RequestedSearchProfileSources
 */
class RequestedTypeListSources extends RequestedCaSources {
  /**
   * @param types {string[]}
   *
   */
  constructor(types = []) {
    super(TYPE_LIST);
    Validation.isArrayOfStrings(types, 'types');
    /** @private */
    this.types = types;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      type: this.type,
      types: this.types,
    };
  }
}

export default RequestedTypeListSources;
