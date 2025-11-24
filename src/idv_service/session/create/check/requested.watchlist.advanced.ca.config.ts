import Validation = require('../../../../yoti_common/validation');
import RequestedCaSources = require('./requested.ca.sources');
import RequestedCaMatchingStrategy = require('./requested.ca.matching.strategy');
import RequestedTypeListSources = require('./requested.type.list.sources');
import RequestedExactMatchingStrategy = require('./requested.exact.matching.strategy');

/**
 * @typedef {import('./requested.watchlist.advanced.ca.check')} RequestedWatchlistAdvancedCaCheck
 */

/**
 * The base configuration applied when creating a {@link RequestedWatchlistAdvancedCaCheck}
 *
 * @class RequestedWatchlistAdvancedCaConfig
 */
class RequestedWatchlistAdvancedCaConfig {
  /**
   *
   * @param removeDeceased {boolean}
   * @param shareUrl {boolean}
   * @param sources {RequestedCaSources}
   * @param matchingStrategy {RequestedCaMatchingStrategy}
   */
  constructor(removeDeceased = false, shareUrl = false, sources, matchingStrategy) {
    const currentClass = new.target;
    if (currentClass === RequestedWatchlistAdvancedCaConfig) {
      throw new Error('RequestedWatchlistAdvancedCaConfig can not be instantiated');
    }

    Validation.isBoolean(removeDeceased, 'removeDeceased');
    /** @private */
    this.removeDeceased = removeDeceased;

    Validation.isBoolean(shareUrl, 'shareUrl');
    /** @private */
    this.shareUrl = shareUrl;

    if (sources) {
      Validation.instanceOf(sources, RequestedCaSources, 'sources');
      /** @private */
      this.sources = sources;
    } else {
      /** @private */
      this.sources = new RequestedTypeListSources();
    }

    if (matchingStrategy) {
      Validation.instanceOf(matchingStrategy, RequestedCaMatchingStrategy, 'matchingStrategy');
      /** @private */
      this.matchingStrategy = matchingStrategy;
    } else {
      /** @private */
      this.matchingStrategy = new RequestedExactMatchingStrategy();
    }
  }

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

export default RequestedWatchlistAdvancedCaConfig;
