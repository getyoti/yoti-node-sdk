import RequestedCheck = require('./requested.check');
import IDVConstants = require('../../../idv.constants');
import Validation = require('../../../../yoti_common/validation');
import RequestedWatchlistScreeningConfig = require('./requested.watchlist.screening.config');

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

export default RequestedWatchlistScreeningCheck;
