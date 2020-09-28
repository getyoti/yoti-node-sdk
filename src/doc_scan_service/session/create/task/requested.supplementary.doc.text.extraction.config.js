'use strict';

const Validation = require('../../../../yoti_common/validation');

/**
 * The configuration applied when creating each RequestedSupplementaryDocTextExtraction
 *
 * @class RequestedSupplementaryDocTextExtractionConfig
 */
class RequestedSupplementaryDocTextExtractionConfig {
  /**
   * @param {string} manualCheck
   *   Describes the manual fallback behaviour applied to each Task
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

module.exports = RequestedSupplementaryDocTextExtractionConfig;
