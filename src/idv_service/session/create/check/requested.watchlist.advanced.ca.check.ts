import Validation = require('../../../../yoti_common/validation');
import IDVConstants = require('../../../idv.constants');
import RequestedCheck = require('./requested.check');
import RequestedWatchlistAdvancedCaConfig = require('./requested.watchlist.advanced.ca.config');

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

export default RequestedWatchlistAdvancedCaCheck;
