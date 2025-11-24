import Validation = require('../../../../../yoti_common/validation');
import DocumentFilter = require('../../filters/document.filter');

class AdvancedIdentityProfileSchemeConfig {
  /**
   * @param {DocumentFilter} filter
   */
  constructor(filter) {
    if (filter) {
      Validation.instanceOf(filter, DocumentFilter, 'filter');
      this.filter = filter;
    }
  }

  toJSON() {
    return {
      filter: this.filter,
    };
  }
}

export default AdvancedIdentityProfileSchemeConfig;
