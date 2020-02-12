'use strict';

const Validation = require('../../../../yoti_common/validation');

/**
 * Represents the configuration properties for a requested
 * face match check in the Doc Scan system.
 *
 * @class RequestedFaceMatchConfig
 */
class RequestedFaceMatchConfig {
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
