'use strict';

const Validation = require('../../../../../yoti_common/validation');
const DocumentFilter = require('../../filters/document.filter');

class AdvancedIdentityProfileSchemeConfig {
  /**
   * @param {DocumentFilter} filter
   */
  constructor(filter) {
    Validation.instanceOf(filter, DocumentFilter, 'filter');
    this.filter = filter;
  }

  toJSON() {
    return {
      filter: this.filter,
    };
  }
}

module.exports = AdvancedIdentityProfileSchemeConfig;
