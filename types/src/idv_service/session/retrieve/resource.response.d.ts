export = ResourceResponse;
declare class ResourceResponse {
    constructor(resource: any);
    /** @private */
    private id;
    /** @private */
    private tasks;
    /**
     * @returns {TaskResponse[]}
     */
    getTasks(): TaskResponse[];
    /**
     * @returns {string}
     */
    getId(): string;
}
import TaskResponse = require("./task.response");
