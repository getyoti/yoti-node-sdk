export = RequiredDocumentResourceResponse;
declare class RequiredDocumentResourceResponse extends RequiredResourceResponse {
    /** @private */
    private requestedTasks;
    /**
     * Returns any tasks that need to be completed as part of the document
     * requirement.
     *
     * @return {RequestedTaskResponse[]}
     */
    getRequestedTasks(): RequestedTaskResponse[];
}
declare namespace RequiredDocumentResourceResponse {
    export { RequestedTaskResponse };
}
import RequiredResourceResponse = require("../required.resource.response");
type RequestedTaskResponse = import('../task/requested.task.response');
