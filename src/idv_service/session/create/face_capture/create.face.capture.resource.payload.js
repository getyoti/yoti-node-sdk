'use strict';

const Validation = require('../../../../yoti_common/validation');

/**
 *
 * @class CreateFaceCaptureResourcePayload
 */
class CreateFaceCaptureResourcePayload {
  /**
   * @param {string} requirementId
   */
  constructor(requirementId) {
    Validation.isString(requirementId, 'requirement_id');
    this.requirementId = requirementId;
  }

  /**
   * @returns {string} requirement id
   */
  getRequirementId() {
    return this.requirementId;
  }
}

module.exports = CreateFaceCaptureResourcePayload;
