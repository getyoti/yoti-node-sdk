export = ResourceResponse;
declare class ResourceResponse {
    constructor(resource: any);
    id: any;
    tasks: any;
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
