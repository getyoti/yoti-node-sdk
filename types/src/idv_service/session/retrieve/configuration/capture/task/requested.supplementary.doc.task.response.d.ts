export = RequestedSupplementaryDocTaskResponse;
declare class RequestedSupplementaryDocTaskResponse extends RequestedTaskResponse {
    /**
     * @param {object} requestedTask
     */
    constructor(requestedTask: object);
    type: any;
    state: any;
}
import RequestedTaskResponse = require("./requested.task.response");
