export = TaskResponse;
declare class TaskResponse {
    constructor(task: any);
    type: any;
    id: any;
    state: any;
    created: YotiDate;
    lastUpdated: YotiDate;
    generatedChecks: any;
    generatedMedia: any;
    /**
     * @returns {string}
     */
    getType(): string;
    /**
     * @returns {string}
     */
    getId(): string;
    /**
     * @returns {string}
     */
    getState(): string;
    /**
     * @returns {YotiDate}
     */
    getCreated(): YotiDate;
    /**
     * @returns {YotiDate}
     */
    getLastUpdated(): YotiDate;
    /**
     * @returns {GeneratedCheckResponse[]}
     */
    getGeneratedChecks(): GeneratedCheckResponse[];
    /**
     * @deprecated this method is now implemented on subclasses.
     *
     * @returns {GeneratedTextDataCheckResponse[]}
     */
    getGeneratedTextDataChecks(): GeneratedTextDataCheckResponse[];
    /**
     * @returns {GeneratedMedia[]}
     */
    getGeneratedMedia(): GeneratedMedia[];
}
import { YotiDate } from "../../../data_type/date";
import GeneratedCheckResponse = require("./generated.check.response");
import GeneratedTextDataCheckResponse = require("./generated.text.data.check.response");
import GeneratedMedia = require("./generated.media");
