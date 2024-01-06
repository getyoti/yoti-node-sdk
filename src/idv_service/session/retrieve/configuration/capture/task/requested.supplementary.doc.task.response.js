const Validation = require('../../../../../../yoti_common/validation');

const RequestedTaskResponse = require('./requested.task.response');

class RequestedSupplementaryDocTaskResponse extends RequestedTaskResponse {
  /**
   * @param {object} requestedTask
   */
  constructor(requestedTask) {
    super();

    Validation.isString(requestedTask.type, 'type');
    /** @private */
    this.type = requestedTask.type;

    Validation.isString(requestedTask.state, 'state');
    /** @private */
    this.state = requestedTask.state;
  }
}

module.exports = RequestedSupplementaryDocTaskResponse;
