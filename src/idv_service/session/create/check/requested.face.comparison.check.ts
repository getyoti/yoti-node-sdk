import RequestedCheck = require('./requested.check');
import RequestedFaceComparisonCheckConfig = require('./requested.face.comparison.config');
import IDVConstants = require('../../../idv.constants');
import Validation = require('../../../../yoti_common/validation');

/**
 * Requests creation of a FaceComparisonCheck
 *
 * @class RequestedFaceComparisonCheck
 */
class RequestedFaceComparisonCheck extends RequestedCheck {
  /**
   * @param {RequestedFaceComparisonCheckConfig} config
   */
  constructor(config) {
    Validation.instanceOf(config, RequestedFaceComparisonCheckConfig, 'config');
    super(IDVConstants.FACE_COMPARISON, config);
  }
}

export default RequestedFaceComparisonCheck;
