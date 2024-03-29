'use strict';

const Validation = require('../../../yoti_common/validation');
const RawResultsResponse = require('./raw.results.response');

class WatchlistSummaryResponse {
  constructor(summary) {
    const currentClass = new.target;
    if (currentClass === WatchlistSummaryResponse) {
      throw new Error('WatchlistSummaryResponse can not be instantiated');
    }

    if (summary.total_hits) {
      Validation.isNumber(summary.total_hits, 'total_hits');
      /** @private */
      this.totalHits = summary.total_hits;
    } else {
      /** @private */
      this.totalHits = 0;
    }

    if (summary.associated_country_codes) {
      Validation.isArrayOfStrings(summary.associated_country_codes, 'associated_country_codes');
      /** @private */
      this.associatedCountryCodes = summary.associated_country_codes;
    } else {
      /** @private */
      this.associatedCountryCodes = [];
    }

    if (summary.raw_results) {
      /** @private */
      this.rawResults = new RawResultsResponse(summary.raw_results);
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
}

module.exports = WatchlistSummaryResponse;
