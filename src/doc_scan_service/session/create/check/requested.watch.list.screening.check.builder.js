'use strict';

const RequestedWatchListScreeningCheck = require('./requested.watch.list.screening.check');
const RequestedWatchListScreeningConfig = require('./requested.watch.list.screening.config');
const DocScanConstants = require('../../../doc.scan.constants');
const Validation = require('../../../../yoti_common/validation');

/**
 * Builder to assist the creation of {@link RequestedWatchListScreeningCheck}.
 *
 * @class RequestedWatchListScreeningCheckBuilder
 */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["build"] }] */
class RequestedWatchListScreeningCheckBuilder {
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
    const config = new RequestedWatchListScreeningConfig(this.categories);
    return new RequestedWatchListScreeningCheck(config);
  }
}

module.exports = RequestedWatchListScreeningCheckBuilder;
