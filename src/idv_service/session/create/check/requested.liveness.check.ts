import RequestedCheck = require('./requested.check');
import RequestedLivenessConfig = require('./requested.liveness.config');
import IDVConstants = require('../../../idv.constants');
import Validation = require('../../../../yoti_common/validation');

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
    super(IDVConstants.LIVENESS, config);
  }
}

export default RequestedLivenessCheck;
