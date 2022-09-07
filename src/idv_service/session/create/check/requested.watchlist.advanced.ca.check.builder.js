'use strict';

const Validation = require('../../../../yoti_common/validation');
const RequestedWatchlistAdvancedCaCheck = require('./requested.watchlist.advanced.ca.check');
const RequestedWatchlistAdvancedCaConfig = require('./requested.watchlist.advanced.ca.config');

/**
 * Builder to assist the creation of {@link RequestedWatchlistAdvancedCaCheck}.
 *
 * @class RequestedWatchlistAdvancedCaCheckBuilder
 */
class RequestedWatchlistAdvancedCaCheckBuilder {
  /**
   *
   * @param config {RequestedWatchlistAdvancedCaConfig}
   *
   * @returns {this}
   */
  withConfig(config) {
    Validation.instanceOf(config, RequestedWatchlistAdvancedCaConfig, 'config');
    this.config = config;
    return this;
  }

  build() {
    return new RequestedWatchlistAdvancedCaCheck(this.config);
  }
}

module.exports = RequestedWatchlistAdvancedCaCheckBuilder;
