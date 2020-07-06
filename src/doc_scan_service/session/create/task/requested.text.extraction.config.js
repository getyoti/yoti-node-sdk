'use strict';

const Validation = require('../../../../yoti_common/validation');

/**
 * The configuration applied when creating each TextExtractionTask
 *
 * @class RequestedTextExtractionConfig
 */
class RequestedTextExtractionConfig {
  /**
   * @param {string} manualCheck
   *   Describes the manual fallback behaviour applied to each Task
   * @param {string} chipData
   *   Describes the chip data requirement for each Task
   */
  constructor(manualCheck, chipData) {
    Validation.isString(manualCheck, 'manualCheck');
    this.manualCheck = manualCheck;

    Validation.isString(chipData, 'chipData', true);
    this.chipData = chipData;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      manual_check: this.manualCheck,
      chip_data: this.chipData,
    };
  }
}

module.exports = RequestedTextExtractionConfig;
