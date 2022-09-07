'use strict';

const Validation = require('../../../../yoti_common/validation');
const RequestedCustomAccountWatchlistAdvancedCaConfig = require('./requested.custom.account.watchlist.advanced.ca.config');
const RequestedWatchlistAdvancedCaConfigBuilder = require('./requested.watchlist.advanced.ca.config.builder');

/**
 * Builder to assist creation of {@link RequestedCustomAccountWatchlistAdvancedCaConfig}.
 *
 * @class RequestedWatchlistScreeningConfig
 */
// eslint-disable-next-line max-len
class RequestedCustomAccountWatchlistAdvancedCaConfigBuilder extends RequestedWatchlistAdvancedCaConfigBuilder {
  /**
   * Sets monitoring used for custom account watchlist advanced ca
   *
   * @param apiKey {string}
   *
   * @returns {this}
   */
  withApiKey(apiKey) {
    Validation.notNullOrEmpty(apiKey, 'apiKey');
    Validation.isString(apiKey, 'apiKey');
    this.apiKey = apiKey;
    return this;
  }

  /**
   * Sets monitoring used for custom account watchlist advanced ca
   *
   * @param monitoring {boolean}
   *
   * @returns {this}
   */
  withMonitoring(monitoring) {
    Validation.isBoolean(monitoring, 'monitoring');
    this.monitoring = monitoring;
    return this;
  }

  /**
   * Sets tags used for custom account watchlist advanced ca
   *
   * @param tags {object}
   *
   * @returns {this}
   */
  withTags(tags) {
    Validation.isPlainObject(tags, 'tags');
    Validation.isArrayOfStrings(Object.keys(tags), 'tags.keys');
    Object.keys(tags).forEach((key) => {
      Validation.notNull(tags[key], `tags.${key}`);
    });
    this.tags = tags;
    return this;
  }

  /**
   * Sets monitoring used for custom account watchlist advanced ca
   *
   * @param clientRef {string}
   *
   * @returns {this}
   */
  withClientRef(clientRef) {
    Validation.notNullOrEmpty(clientRef, 'clientRef');
    Validation.isString(clientRef, 'clientRef');
    this.clientRef = clientRef;
    return this;
  }

  /**
   *
   * @return {RequestedCustomAccountWatchlistAdvancedCaConfig}
   */
  build() {
    return new RequestedCustomAccountWatchlistAdvancedCaConfig(
      this.removeDeceased,
      this.shareUrl,
      this.sources,
      this.matchingStrategy,
      this.apiKey,
      this.monitoring,
      this.tags,
      this.clientRef
    );
  }
}

module.exports = RequestedCustomAccountWatchlistAdvancedCaConfigBuilder;
