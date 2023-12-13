export = RequestedIdDocTaskResponse;
declare class RequestedIdDocTaskResponse extends RequestedTaskResponse {
    /**
     * @param {object} requestedTask
     */
    constructor(requestedTask: object);
    type: any;
    state: any;
}
import RequestedTaskResponse = require("./requested.task.response");
