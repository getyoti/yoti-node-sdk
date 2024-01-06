export = CheckResponse;
declare class CheckResponse {
    constructor(check: any);
    /** @private */
    private type;
    /** @private */
    private id;
    /** @private */
    private state;
    /** @private */
    private resourcesUsed;
    /** @private */
    private generatedMedia;
    /** @private */
    private report;
    /** @private */
    private created;
    /** @private */
    private lastUpdated;
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
     * @returns {string[]}
     */
    getResourcesUsed(): string[];
    /**
     * @returns {GeneratedMedia[]}
     */
    getGeneratedMedia(): GeneratedMedia[];
    /**
     * @returns {ReportResponse}
     */
    getReport(): ReportResponse;
    /**
     * @returns {YotiDate}
     */
    getCreated(): YotiDate;
    /**
     * @returns {YotiDate}
     */
    getLastUpdated(): YotiDate;
}
import GeneratedMedia = require("./generated.media");
import ReportResponse = require("./report.response");
import { YotiDate } from "../../../data_type/date";
