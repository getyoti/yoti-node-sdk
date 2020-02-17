'use strict';

const TaskResponse = require('./task.response');
const TextExtractionTaskResponse = require('./text.extraction.task.response');
const DocScanConstants = require('../../doc.scan.constants');
const Validation = require('../../../yoti_common/validation');

class ResourceResponse {
  constructor(resource) {
    Validation.isString(resource.id, 'id', true);
    this.id = resource.id;

    if (resource.tasks) {
      this.tasks = resource.tasks
        .map((task) => {
          switch (task.type) {
            case DocScanConstants.ID_DOCUMENT_TEXT_DATA_EXTRACTION:
              return new TextExtractionTaskResponse(task);
            default:
              return new TaskResponse(task);
          }
        })
        .filter(task => task !== null);
    }
  }

  /**
   * @returns {TaskResponse[]}
   */
  getTasks() {
    return this.tasks;
  }

  /**
   * @returns {string}
   */
  getId() {
    return this.id;
  }
}

module.exports = ResourceResponse;
