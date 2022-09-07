'use strict';

const RequestedCheck = require('./requested.check');
const IDVConstants = require('../../../idv.constants');
const Validation = require('../../../../yoti_common/validation');
const RequestedWatchlistScreeningConfig = require('./requested.watchlist.screening.config');

/**
 * @class RequestedWatchlistScreeningCheck
 */
class RequestedWatchlistScreeningCheck extends RequestedCheck {
  /**
   * @param {RequestedWatchlistScreeningConfig} config
   */
  constructor(config) {
    Validation.instanceOf(config, RequestedWatchlistScreeningConfig, 'config');
    super(IDVConstants.WATCHLIST_SCREENING, config);
  }
}

module.exports = RequestedWatchlistScreeningCheck;
