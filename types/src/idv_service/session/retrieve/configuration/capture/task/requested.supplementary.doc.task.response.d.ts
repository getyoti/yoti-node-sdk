export = RequestedSupplementaryDocTaskResponse;
declare class RequestedSupplementaryDocTaskResponse extends RequestedTaskResponse {
    /**
     * @param {object} requestedTask
     */
    constructor(requestedTask: object);
    /** @private */
    private type;
    /** @private */
    private state;
}
import RequestedTaskResponse = require("./requested.task.response");
