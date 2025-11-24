import GeneratedTextDataCheckResponse = require('./generated.text.data.check.response');
import TaskResponse = require('./task.response');

class TextExtractionTaskResponse extends TaskResponse {
  /**
   * @returns {GeneratedTextDataCheckResponse[]}
   */
  getGeneratedTextDataChecks() {
    return this
      .getGeneratedChecks()
      .filter((check) => check instanceof GeneratedTextDataCheckResponse);
  }
}

export default TextExtractionTaskResponse;
