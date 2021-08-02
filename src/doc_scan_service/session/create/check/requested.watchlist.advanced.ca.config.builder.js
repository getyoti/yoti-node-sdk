'use strict';

const Validation = require('../../../../yoti_common/validation');
const RequestedCaSources = require('./requested.ca.sources');
const RequestedCaMatchingStrategy = require('./requested.ca.matching.strategy');

/**
 * The base Builder to assist the creation of {@link RequestedWatchlistAdvancedCaConfig}.
 *
 * @class RequestedWatchlistAdvancedCaConfigBuilder
 */
class RequestedWatchlistAdvancedCaConfigBuilder {
  /**
   * Sets removeDeceased used for watchlist advanced ca
   *
   * @param removeDeceased {boolean}
   *
   * @returns {this}
   */
  withRemoveDeceased(removeDeceased) {
    Validation.isBoolean(removeDeceased, 'removeDeceased');
    this.removeDeceased = removeDeceased;
    return this;
  }

  /**
   * Sets shareUrl used for watchlist advanced ca
   *
   * @param shareUrl {boolean}
   *
   * @returns {this}
   */
  withShareUrl(shareUrl) {
    Validation.isBoolean(shareUrl, 'shareUrl');
    this.shareUrl = shareUrl;
    return this;
  }

  /**
   * Sets sources used for watchlist advanced ca
   *
   * @param sources {RequestedCaSources}
   *
   * @returns {this}
   */
  withSources(sources) {
    Validation.instanceOf(sources, RequestedCaSources, 'sources');
    this.sources = sources;
    return this;
  }

  /**
   * Sets matchingStrategy used for watchlist advanced ca
   *
   * @param matchingStrategy  {RequestedCaMatchingStrategy}
   *
   * @returns {this}
   */
  withMatchingStrategy(matchingStrategy) {
    Validation.instanceOf(matchingStrategy, RequestedCaMatchingStrategy, 'matchingStrategy');
    this.matchingStrategy = matchingStrategy;
    return this;
  }
}

module.exports = RequestedWatchlistAdvancedCaConfigBuilder;
