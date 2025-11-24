import RequestedYotiAccountWatchlistAdvancedCaConfig = require('./requested.yoti.account.watchlist.advanced.ca.config');
import RequestedWatchlistAdvancedCaConfigBuilder = require('./requested.watchlist.advanced.ca.config.builder');

/**
 * Builder to assist creation of {@link RequestedYotiAccountWatchlistAdvancedCaConfig}.
 *
 * @class RequestedYotiAccountWatchlistAdvancedCaConfigBuilder
 */
// eslint-disable-next-line max-len
class RequestedYotiAccountWatchlistAdvancedCaConfigBuilder extends RequestedWatchlistAdvancedCaConfigBuilder {
  /**
   *
   * @return {RequestedYotiAccountWatchlistAdvancedCaConfig}
   */
  build() {
    return new RequestedYotiAccountWatchlistAdvancedCaConfig(
      this.removeDeceased,
      this.shareUrl,
      this.sources,
      this.matchingStrategy
    );
  }
}

export default RequestedYotiAccountWatchlistAdvancedCaConfigBuilder;
