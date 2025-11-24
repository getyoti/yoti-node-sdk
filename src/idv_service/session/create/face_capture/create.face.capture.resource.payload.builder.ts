import CreateFaceCaptureResourcePayload = require('./create.face.capture.resource.payload');
import Validation = require('../../../../yoti_common/validation');

/**
 *
 * @class CreateFaceCaptureResourcePayloadBuilder
 */
class CreateFaceCaptureResourcePayloadBuilder {
  /**
   * Sets the id of the requirement that the resource will be used to satisfy.
   *
   * @param {string} requirementId
   * @return CreateFaceCaptureResourcePayloadBuilder
   */
  withRequirementId(requirementId) {
    Validation.isString(requirementId, 'requirement_id');
    this.requirementId = requirementId;
    return this;
  }

  build() {
    return new CreateFaceCaptureResourcePayload(this.requirementId);
  }
}

export default CreateFaceCaptureResourcePayloadBuilder;
