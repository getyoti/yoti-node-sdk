'use strict';

const WatchlistAdvancedCaSearchConfigResponse = require('./watchlist.advanced.ca.search.config.response');
const Validation = require('../../../yoti_common/validation');

class CustomAccountWatchlistCaSearchConfigResponse extends WatchlistAdvancedCaSearchConfigResponse {
  constructor(searchConfig) {
    super(searchConfig);

    Validation.isString(searchConfig.api_key, 'api_key');
    /** @private */
    this.apiKey = searchConfig.api_key;

    Validation.isBoolean(searchConfig.monitoring, 'monitoring');
    /** @private */
    this.monitoring = searchConfig.monitoring;

    if (searchConfig.tags) {
      Validation.isPlainObject(searchConfig.tags, 'tags');
      const keys = Object.keys(searchConfig.tags);
      const values = keys.map((key) => searchConfig.tags[key]);
      Validation.isArrayOfStrings(keys, 'tags.keys');
      Validation.isArrayOfStrings(values, 'tags.values');
      /** @private */
      this.tags = searchConfig.tags;
    }

    Validation.isString(searchConfig.client_ref, 'client_ref');
    /** @private */
    this.clientRef = searchConfig.client_ref;
  }

  /**
   *
   * @return {string}
   */
  getApiKey() {
    return this.apiKey;
  }

  /**
   *
   * @return {boolean}
   */
  isMonitoring() {
    return this.monitoring;
  }

  /**
   *
   * @return {{[k: string]: string}}
   */
  getTags() {
    return this.tags;
  }

  /**
   *
   * @return {string}
   */
  getClientRef() {
    return this.clientRef;
  }
}

module.exports = CustomAccountWatchlistCaSearchConfigResponse;
