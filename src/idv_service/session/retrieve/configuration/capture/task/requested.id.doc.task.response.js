const Validation = require('../../../../../../yoti_common/validation');

const RequestedTaskResponse = require('./requested.task.response');

class RequestedIdDocTaskResponse extends RequestedTaskResponse {
  /**
   * @param {object} requestedTask
   */
  constructor(requestedTask) {
    super();

    Validation.isString(requestedTask.type);
    this.type = requestedTask.type;

    Validation.isString(requestedTask.state);
    this.state = requestedTask.state;
  }
}

module.exports = RequestedIdDocTaskResponse;
