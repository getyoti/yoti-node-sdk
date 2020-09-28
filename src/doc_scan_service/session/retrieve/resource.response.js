'use strict';

const TaskResponse = require('./task.response');
const TextExtractionTaskResponse = require('./text.extraction.task.response');
const DocScanConstants = require('../../doc.scan.constants');
const Validation = require('../../../yoti_common/validation');
const SupplementaryTextExtractionTaskResponse = require('./supplementary.document.text.extraction.task.response');

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
            case DocScanConstants.SUPPLEMENTARY_DOCUMENT_TEXT_DATA_EXTRACTION:
              return new SupplementaryTextExtractionTaskResponse(task);
            default:
              return new TaskResponse(task);
          }
        });
    } else {
      this.tasks = [];
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
