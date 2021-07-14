'use strict';

const RequestedWatchlistScreeningCheck = require('./requested.watchlist.screening.check');
const RequestedWatchlistScreeningConfig = require('./requested.watchlist.screening.config');
const DocScanConstants = require('../../../doc.scan.constants');
const Validation = require('../../../../yoti_common/validation');

/**
 * Builder to assist the creation of {@link RequestedWatchlistScreeningCheck}.
 *
 * @class RequestedWatchlistScreeningCheckBuilder
 */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["build"] }] */
class RequestedWatchlistScreeningCheckBuilder {
  constructor() {
    this.categories = [];
  }

  /**
   * Adds ADVERSE_MEDIA to the list of categories used for watchlist screening
   *
   * @returns {this}
   */
  withAdverseMediaCategory() {
    return this.withCategory(DocScanConstants.ADVERSE_MEDIA);
  }

  /**
   * Adds SANCTIONS to the list of categories used for watchlist screening
   *
   * @returns {this}
   */
  withSanctionsCategory() {
    return this.withCategory(DocScanConstants.SANCTIONS);
  }

  /**
   * Adds a category to the list of categories used for watchlist screening
   *
   * @param {string} category
   *
   * @returns {this}
   */
  withCategory(category) {
    Validation.isString(category, 'category');
    Validation.notNullOrEmpty(category, 'category');
    this.categories.push(category);
    return this;
  }

  build() {
    const config = new RequestedWatchlistScreeningConfig(this.categories);
    return new RequestedWatchlistScreeningCheck(config);
  }
}

module.exports = RequestedWatchlistScreeningCheckBuilder;
