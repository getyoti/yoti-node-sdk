'use strict';

const Validation = require('../../../../yoti_common/validation');

/**
 * The configuration applied when creating a DocumentAuthenticityCheck
 *
 * @class RequestedDocumentAuthenticityConfig
 */
class RequestedDocumentAuthenticityConfig {
  /**
   * @param {string} manualCheck
   */
  constructor(manualCheck) {
    Validation.isString(manualCheck, 'manualCheck', true);
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

module.exports = RequestedDocumentAuthenticityConfig;
