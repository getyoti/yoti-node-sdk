'use strict';

const RequestedCheck = require('./requested.check');
const RequestedLivenessConfig = require('./requested.liveness.config');
const DocScanConstants = require('../../../doc.scan.constants');
const Validation = require('../../../../yoti_common/validation');

/**
 * Requests creation of a LivenessCheck
 *
 * @class RequestedLivenessCheck
 */
class RequestedLivenessCheck extends RequestedCheck {
  /**
   * @param {RequestedLivenessConfig} config
   */
  constructor(config) {
    Validation.instanceOf(config, RequestedLivenessConfig, 'config');
    super(DocScanConstants.LIVENESS, config);
  }
}

module.exports = RequestedLivenessCheck;
