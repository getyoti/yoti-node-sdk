export = TaskResponse;
declare class TaskResponse {
    constructor(task: any);
    /** @private */
    private type;
    /** @private */
    private id;
    /** @private */
    private state;
    /** @private */
    private created;
    /** @private */
    private lastUpdated;
    /** @private */
    private generatedChecks;
    /** @private */
    private generatedMedia;
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
