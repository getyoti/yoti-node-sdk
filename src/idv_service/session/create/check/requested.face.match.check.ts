import RequestedCheck = require('./requested.check');
import RequestedFaceMatchCheckConfig = require('./requested.face.match.config');
import IDVConstants = require('../../../idv.constants');
import Validation = require('../../../../yoti_common/validation');

/**
 * Requests creation of a FaceMatchCheck
 *
 * @class RequestedFaceMatchCheck
 */
class RequestedFaceMatchCheck extends RequestedCheck {
  /**
   * @param {RequestedFaceMatchCheckConfig} config
   */
  constructor(config) {
    Validation.instanceOf(config, RequestedFaceMatchCheckConfig, 'config');
    super(IDVConstants.ID_DOCUMENT_FACE_MATCH, config);
  }
}

export default RequestedFaceMatchCheck;
