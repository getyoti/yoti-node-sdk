'use strict';

const Validation = require('../../../../yoti_common/validation');

/**
 * The configuration applied when creating a FaceMatchCheck
 *
 * @class RequestedFaceMatchConfig
 */
class RequestedFaceMatchConfig {
  /**
   * @param {string} manualCheck
   *   The value for a manual check for a given face match.
   */
  constructor(manualCheck) {
    Validation.isString(manualCheck, 'manualCheck');
    this.manualCheck = manualCheck;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      manual_check: this.manualCheck,
    };
  }
}

module.exports = RequestedFaceMatchConfig;
