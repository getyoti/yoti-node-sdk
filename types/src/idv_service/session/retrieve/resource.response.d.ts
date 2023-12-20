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
     * @return AllowedSourceResponse
     */
    getSource(): any;
    /**
     * @returns {string}
     */
    getId(): string;
}
import TaskResponse = require("./task.response");
