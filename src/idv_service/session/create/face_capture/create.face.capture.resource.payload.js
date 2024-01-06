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
    /** @private */
    this.requirementId = requirementId;
  }

  toJSON() {
    return {
      requirement_id: this.requirementId,
    };
  }
}

module.exports = CreateFaceCaptureResourcePayload;
