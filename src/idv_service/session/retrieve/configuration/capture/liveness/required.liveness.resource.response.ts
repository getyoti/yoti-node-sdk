import Validation = require('../../../../../../yoti_common/validation');
import RequiredResourceResponse = require('../required.resource.response');

class RequiredLivenessResourceResponse extends RequiredResourceResponse {
  /**
   * @param {object} requiredResource
   */
  constructor(requiredResource) {
    super(requiredResource);

    Validation.isString(requiredResource.liveness_type, 'liveness_type');
    /** @private */
    this.livenessType = requiredResource.liveness_type;
  }

  /**
     * @return {string | null}
     */
  getLivenessType() {
    return this.livenessType;
  }
}

export default RequiredLivenessResourceResponse;
