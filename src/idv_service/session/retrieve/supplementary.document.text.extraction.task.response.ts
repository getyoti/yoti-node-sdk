import TaskResponse = require('./task.response');
import GeneratedSupplementaryDocumentTextDataCheckResponse = require('./generated.supplementary.document.text.data.check.response');

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

export default SupplementaryDocumentTextExtractionTaskResponse;
