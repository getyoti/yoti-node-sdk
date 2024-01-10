'use strict';

const Validation = require('../../../../yoti_common/validation');

/**
 * The configuration applied when creating a FaceComparisonCheck
 *
 * @class RequestedFaceComparisonConfig
 */
class RequestedFaceComparisonConfig {
  /**
   * @param {string} manualCheck
   *   The value for a manual check for a given face match.
   */
  constructor(manualCheck) {
    Validation.isString(manualCheck, 'manualCheck');
    /** @private */
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

module.exports = RequestedFaceComparisonConfig;