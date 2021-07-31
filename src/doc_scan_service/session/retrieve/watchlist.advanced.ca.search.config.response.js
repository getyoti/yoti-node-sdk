'use strict';

const Validation = require('../../../yoti_common/validation');
const { WITH_YOTI_ACCOUNT, WITH_CUSTOM_ACCOUNT } = require('../../doc.scan.constants');
const WatchlistSearchConfigResponse = require('./watchlist.search.config.response');
const SearchProfileSourcesResponse = require('./search.profile.sources.response');
const TypeListSourcesResponse = require('./type.list.sources.response');
const CaSourcesResponse = require('./ca.sources.response');
const CaMatchingStrategyResponse = require('./ca.matching.strategy.response');
const ExactMatchingStrategyResponse = require('./exact.matching.strategy.response');
const FuzzyMatchingStrategyResponse = require('./fuzzy.matching.strategy.response');

const CaSourcesResponseClassesByType = {
  [CaSourcesResponse.types.PROFILE]: SearchProfileSourcesResponse,
  [CaSourcesResponse.types.TYPE_LIST]: TypeListSourcesResponse,
};

const CaMatchingStrategyResponseClassesByType = {
  [CaMatchingStrategyResponse.types.EXACT]: ExactMatchingStrategyResponse,
  [CaMatchingStrategyResponse.types.FUZZY]: FuzzyMatchingStrategyResponse,
};

const types = {
  WITH_YOTI_ACCOUNT,
  WITH_CUSTOM_ACCOUNT,
};

class WatchlistAdvancedCaSearchConfigResponse extends WatchlistSearchConfigResponse {
  constructor(searchConfig) {
    const currentClass = new.target;
    if (currentClass === WatchlistAdvancedCaSearchConfigResponse) {
      throw new Error('WatchlistAdvancedCaSearchConfigResponse can not be instantiated');
    }
    super();
    Validation.isString(searchConfig.type, 'type');
    Validation.oneOf(searchConfig.type, Object.keys(types), 'type');
    this.type = searchConfig.type;

    Validation.isBoolean(searchConfig.remove_deceased, 'remove_deceased');
    this.removeDeceased = searchConfig.remove_deceased;

    Validation.isBoolean(searchConfig.share_url, 'share_url');
    this.shareUrl = searchConfig.share_url;

    if (searchConfig.sources) {
      const CaSourcesResponseClass = CaSourcesResponseClassesByType[searchConfig.sources.type];
      if (CaSourcesResponseClass) {
        this.sources = new CaSourcesResponseClass(searchConfig.sources);
      }
    }

    if (searchConfig.matching_strategy) {
      // eslint-disable-next-line max-len
      const CaMatchingStrategyResponseClass = CaMatchingStrategyResponseClassesByType[searchConfig.matching_strategy.type];
      if (CaMatchingStrategyResponseClass) {
        this.matchingStrategy = new CaMatchingStrategyResponseClass(searchConfig.matching_strategy);
      }
    }
  }

  /**
   * @returns {string}
   */
  getType() {
    return this.type;
  }

  /**
   * @returns {boolean}
   */
  isRemoveDeceased() {
    return this.removeDeceased;
  }

  /**
   * @returns {shareUrl}
   */
  isShareUrl() {
    return this.shareUrl;
  }

  /**
   * @returns {CaSourcesResponse}
   */
  getSources() {
    return this.sources;
  }

  /**
   * @returns {CaMatchingStrategyResponse}
   */
  getMatchingStrategy() {
    return this.matchingStrategy;
  }
}

WatchlistAdvancedCaSearchConfigResponse.types = types;

module.exports = WatchlistAdvancedCaSearchConfigResponse;
