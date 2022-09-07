'use strict';

const TaskResponse = require('./task.response');
const GeneratedSupplementaryDocumentTextDataCheckResponse = require('./generated.supplementary.document.text.data.check.response');

class SupplementaryDocumentTextExtractionTaskResponse extends TaskResponse {
  /**
   * @returns {GeneratedSupplementaryDocumentTextDataCheckResponse[]}
   */
  getGeneratedTextDataChecks() {
    return this
      .getGeneratedChecks()
      .filter((check) => check instanceof GeneratedSupplementaryDocumentTextDataCheckResponse);
  }
}

module.exports = SupplementaryDocumentTextExtractionTaskResponse;
