'use strict';

const RawResultsResponse = require('./raw.results.response');
const SearchConfigResponse = require('./search.config.response');
const Validation = require('../../../yoti_common/validation');

class WatchListSummaryResponse {
  constructor(summary) {
    if (summary.total_hits) {
      Validation.isNumber(summary.total_hits, 'total_hits');
      this.totalHits = summary.total_hits;
    } else {
      this.totalHits = 0;
    }

    if (summary.associated_country_codes) {
      Validation.isArrayOfStrings(summary.associated_country_codes, 'associated_country_codes');
      this.associatedCountryCodes = summary.associated_country_codes;
    } else {
      this.associatedCountryCodes = [];
    }

    if (summary.raw_results) {
      this.rawResults = new RawResultsResponse(summary.raw_results);
    }

    if (summary.search_config) {
      this.searchConfig = new SearchConfigResponse(summary.search_config);
    }
  }

  /**
   * @returns {number}
   */
  getTotalHits() {
    return this.totalHits;
  }

  /**
   * @returns {string[]}
   */
  getAssociatedCountryCodes() {
    return this.associatedCountryCodes;
  }

  /**
   * @returns {RawResultsResponse}
   */
  getRawResults() {
    return this.rawResults;
  }

  /**
   * @returns {SearchConfigResponse}
   */
  getSearchConfig() {
    return this.searchConfig;
  }
}

module.exports = WatchListSummaryResponse;
