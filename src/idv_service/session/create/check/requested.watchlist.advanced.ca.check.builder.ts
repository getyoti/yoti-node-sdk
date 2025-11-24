import Validation = require('../../../../yoti_common/validation');
import RequestedWatchlistAdvancedCaCheck = require('./requested.watchlist.advanced.ca.check');
import RequestedWatchlistAdvancedCaConfig = require('./requested.watchlist.advanced.ca.config');

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

export default RequestedWatchlistAdvancedCaCheckBuilder;
