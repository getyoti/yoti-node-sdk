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
   * @param {boolean} createExpandedDocumentFields
   *   Enables additional information
   */
  constructor(manualCheck, chipData, createExpandedDocumentFields) {
    Validation.isString(manualCheck, 'manualCheck');
    /** @private */
    this.manualCheck = manualCheck;

    Validation.isString(chipData, 'chipData', true);
    /** @private */
    this.chipData = chipData;

    Validation.isBoolean(createExpandedDocumentFields, 'createExpandedDocumentFields', true);
    /** @private */
    this.createExpandedDocumentFields = createExpandedDocumentFields;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      manual_check: this.manualCheck,
      chip_data: this.chipData,
      create_expanded_document_fields: this.createExpandedDocumentFields,
    };
  }
}

module.exports = RequestedTextExtractionConfig;
