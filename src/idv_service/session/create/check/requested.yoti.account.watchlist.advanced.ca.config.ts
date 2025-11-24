import { WITH_YOTI_ACCOUNT } from '../../../idv.constants';
import RequestedWatchlistAdvancedCaConfig = require('./requested.watchlist.advanced.ca.config');

/**
 * @typedef {import('./requested.watchlist.advanced.ca.check')} RequestedWatchlistAdvancedCaCheck
 */

/**
 * The configuration applied when creating a {@link RequestedWatchlistAdvancedCaCheck}
 * with Yoti account
 *
 * @class RequestedYotiAccountWatchlistAdvancedCaConfig
 */
class RequestedYotiAccountWatchlistAdvancedCaConfig extends RequestedWatchlistAdvancedCaConfig {
  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return Object.assign({
      type: WITH_YOTI_ACCOUNT,
    }, super.toJSON());
  }
}

export default RequestedYotiAccountWatchlistAdvancedCaConfig;
