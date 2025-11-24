import TaskResponse = require('./task.response');
import TextExtractionTaskResponse = require('./text.extraction.task.response');
import IDVConstants = require('../../idv.constants');
import Validation = require('../../../yoti_common/validation');
import SupplementaryTextExtractionTaskResponse = require('./supplementary.document.text.extraction.task.response');

class ResourceResponse {
  constructor(resource) {
    Validation.isString(resource.id, 'id', true);
    /** @private */
    this.id = resource.id;

    if (resource.tasks) {
      /** @private */
      this.tasks = resource.tasks
        .map((task) => {
          switch (task.type) {
            case IDVConstants.ID_DOCUMENT_TEXT_DATA_EXTRACTION:
              return new TextExtractionTaskResponse(task);
            case IDVConstants.SUPPLEMENTARY_DOCUMENT_TEXT_DATA_EXTRACTION:
              return new SupplementaryTextExtractionTaskResponse(task);
            default:
              return new TaskResponse(task);
          }
        });
    } else {
      /** @private */
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

export default ResourceResponse;
