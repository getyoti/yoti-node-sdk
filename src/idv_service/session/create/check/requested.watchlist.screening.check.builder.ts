import RequestedWatchlistScreeningCheck = require('./requested.watchlist.screening.check');
import RequestedWatchlistScreeningConfig = require('./requested.watchlist.screening.config');
import IDVConstants = require('../../../idv.constants');
import Validation = require('../../../../yoti_common/validation');

/**
 * Builder to assist the creation of {@link RequestedWatchlistScreeningCheck}.
 *
 * @class RequestedWatchlistScreeningCheckBuilder
 */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["build"] }] */
class RequestedWatchlistScreeningCheckBuilder {
  constructor() {
    /** @private */
    this.categories = [];
  }

  /**
   * Adds ADVERSE_MEDIA to the list of categories used for watchlist screening
   *
   * @returns {this}
   */
  withAdverseMediaCategory() {
    return this.withCategory(IDVConstants.ADVERSE_MEDIA);
  }

  /**
   * Adds SANCTIONS to the list of categories used for watchlist screening
   *
   * @returns {this}
   */
  withSanctionsCategory() {
    return this.withCategory(IDVConstants.SANCTIONS);
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

export default RequestedWatchlistScreeningCheckBuilder;
