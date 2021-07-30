'use strict';

const RequestedWatchlistAdvancedCaConfig = require('./requested.watchlist.advanced.ca.config');

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
    return {
      remove_deceased: this.removeDeceased,
      share_url: this.shareUrl,
      sources: this.sources,
      matching_strategy: this.matchingStrategy,
    };
  }
}

module.exports = RequestedYotiAccountWatchlistAdvancedCaConfig;
