export = RequiredDocumentResourceResponse;
declare class RequiredDocumentResourceResponse extends RequiredResourceResponse {
    requestedTasks: any;
    /**
     * Returns any tasks that need to be completed as part of the document
     * requirement.
     *
     * @return {RequestedTaskResponse[]}
     */
    getRequestedTasks(): RequestedTaskResponse[];
}
import RequiredResourceResponse = require("../required.resource.response");
