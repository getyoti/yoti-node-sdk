'use strict';

const Validation = require('../../../../yoti_common/validation');
const { WITH_CUSTOM_ACCOUNT } = require('../../../doc.scan.constants');
const RequestedWatchlistAdvancedCaConfig = require('./requested.watchlist.advanced.ca.config');

/**
 * The configuration applied when creating a {@link RequestedWatchlistAdvancedCaCheck}
 * with custom account
 *
 * @class RequestedCustomAccountWatchlistAdvancedCaConfig
 */
class RequestedCustomAccountWatchlistAdvancedCaConfig extends RequestedWatchlistAdvancedCaConfig {
  /**
   *
   * @param removeDeceased {boolean}
   * @param shareUrl {boolean}
   * @param sources {RequestedCaSources}
   * @param matchingStrategy {RequestedCaMatchingStrategy}
   * @param apiKey {string}
   * @param monitoring {boolean}
   * @param tags {object}
   * @param clientRef {string}
   */
  constructor(
    removeDeceased = false,
    shareUrl = false,
    sources,
    matchingStrategy,
    apiKey,
    monitoring = false,
    tags,
    clientRef
  ) {
    super(removeDeceased, shareUrl, sources, matchingStrategy);
    Validation.isString(apiKey, 'apiKey');
    Validation.notNullOrEmpty(apiKey, 'apiKey');
    this.apiKey = apiKey;

    Validation.isBoolean(monitoring, 'monitoring');
    this.monitoring = monitoring;

    if (tags) {
      Validation.isPlainObject(tags, 'tags');
      Validation.isArrayOfStrings(Object.keys(tags), 'tags.keys');
      Object.keys(tags).forEach((key) => {
        Validation.notNull(tags[key], `tags.${key}`);
      });
      this.tags = tags;
    }

    Validation.isString(clientRef, 'clientRef');
    Validation.notNullOrEmpty(clientRef, 'clientRef');
    this.clientRef = clientRef;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return Object.assign({
      type: WITH_CUSTOM_ACCOUNT,
      api_key: this.apiKey,
      monitoring: this.monitoring,
      tags: this.tags,
      client_ref: this.clientRef,
    }, super.toJSON());
  }
}

module.exports = RequestedCustomAccountWatchlistAdvancedCaConfig;
