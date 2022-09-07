'use strict';

const Validation = require('../../../../yoti_common/validation');
const IDVConstants = require('../../../idv.constants');
const RequestedCheck = require('./requested.check');
const RequestedWatchlistAdvancedCaConfig = require('./requested.watchlist.advanced.ca.config');

/**
 * @class RequestedWatchlistAdvancedCaCheck
 */
class RequestedWatchlistAdvancedCaCheck extends RequestedCheck {
  /**
   * @param {RequestedWatchlistAdvancedCaConfig} config
   */
  constructor(config) {
    Validation.instanceOf(config, RequestedWatchlistAdvancedCaConfig, 'config');

    super(IDVConstants.WATCHLIST_ADVANCED_CA, config);
  }
}

module.exports = RequestedWatchlistAdvancedCaCheck;
