'use strict';

const Validation = require('../../../../yoti_common/validation');
const AllowedProvider = require('./allowed.provider');

class AllowedProviderBuilder {
  withName(provider) {
    Validation.isString(provider, 'provider');
    this.name = provider;
  }

  /**
   * @returns {AllowedProvider}
   */
  build() {
    return new AllowedProvider(
      this.name
    );
  }
}

module.exports = AllowedProviderBuilder;
