'use strict';

const Validation = require('../../../../yoti_common/validation');

/**
 * Represents configuration properties for a requested text extraction
 * task within the Doc Scan system.
 *
 * @class RequestedTextExtractionConfig
 */
class RequestedTextExtractionConfig {
  /**
   * @param {string} manualCheck
   *   The value for the manual check
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

module.exports = RequestedTextExtractionConfig;
