'use strict';

const GeneratedTextDataCheckResponse = require('./generated.text.data.check.response');
const TaskResponse = require('./task.response');

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

module.exports = TextExtractionTaskResponse;
