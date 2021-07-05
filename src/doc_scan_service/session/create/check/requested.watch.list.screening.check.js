'use strict';

const RequestedCheck = require('./requested.check');
const DocScanConstants = require('../../../doc.scan.constants');
const Validation = require('../../../../yoti_common/validation');
const RequestedWatchListScreeningConfig = require('./requested.watch.list.screening.config');

/**
 * @class RequestedWatchListScreeningCheck
 */
class RequestedWatchListScreeningCheck extends RequestedCheck {
  /**
   * @param {RequestedWatchListScreeningConfig} config
   */
  constructor(config) {
    Validation.instanceOf(config, RequestedWatchListScreeningConfig, 'config');
    super(DocScanConstants.WATCHLIST_SCREENING, config);
  }
}

module.exports = RequestedWatchListScreeningCheck;
