'use strict';

const Validation = require('../../../../../yoti_common/validation');
const DocumentFilter = require('../../filters/document.filter');
const AdvancedIdentityProfileSchemeConfig = require('./advanced.identity.profile.scheme.config');

class AdvancedIdentityProfileSchemeConfigBuilder {
  /**
   * @param {DocumentFilter} filter
   * @returns {AdvancedIdentityProfileSchemeConfigBuilder}
   */
  withFilter(filter) {
    Validation.instanceOf(filter, DocumentFilter, 'filter');
    this.filter = filter;
    return this;
  }

  /**
   * @returns {AdvancedIdentityProfileSchemeConfig}
   */
  build() {
    return new AdvancedIdentityProfileSchemeConfig(this.filter);
  }
}

module.exports = AdvancedIdentityProfileSchemeConfigBuilder;
