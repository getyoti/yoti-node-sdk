'use strict';

const RequiredResourceResponse = require('../required.resource.response');
const RequestedIdDocTaskResponse = require('../task/requested.id.doc.task.response');
const RequestedSupplementaryDocTaskResponse = require('../task/requested.supplementary.doc.task.response');
const UnknownRequestedTaskResponse = require('../task/unknown.requested.task.response');

const Validation = require('../../../../../../yoti_common/validation');
const IDVConstants = require('../../../../../idv.constants');

/**
 * @typedef {import('../task/requested.task.response')} RequestedTaskResponse
 */

/**
 * @param {object} requestedTask
 * @return {RequestedTaskResponse}
 */
function createTaskFromArray(requestedTask) {
  switch (requestedTask.type) {
    case IDVConstants.ID_DOCUMENT_TEXT_DATA_EXTRACTION:
      /** @returns RequestedTaskResponse */
      return new RequestedIdDocTaskResponse(requestedTask);
    case IDVConstants.SUPPLEMENTARY_DOCUMENT_TEXT_DATA_EXTRACTION:
      /** @returns RequestedTaskResponse */
      return new RequestedSupplementaryDocTaskResponse(requestedTask);
    default:
      /** @returns RequestedTaskResponse */
      return new UnknownRequestedTaskResponse();
  }
}

class RequiredDocumentResourceResponse extends RequiredResourceResponse {
  /**
   * @param {object} requiredResource
   */
  constructor(requiredResource) {
    super(requiredResource);

    if (requiredResource.requested_tasks) {
      Validation.isArray(requiredResource.requested_tasks, 'requested_tasks');
      /** @private */
      this.requestedTasks = requiredResource.requested_tasks.map(
        (requestedTask) => createTaskFromArray(requestedTask)
      );
    }
  }

  /**
   * Returns any tasks that need to be completed as part of the document
   * requirement.
   *
   * @return {RequestedTaskResponse[]}
   */
  getRequestedTasks() {
    return this.requestedTasks;
  }
}

module.exports = RequiredDocumentResourceResponse;
