export = CheckResponse;
declare class CheckResponse {
    constructor(check: any);
    type: any;
    id: any;
    state: any;
    resourcesUsed: any;
    generatedMedia: any;
    report: ReportResponse;
    created: YotiDate;
    lastUpdated: YotiDate;
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
import ReportResponse = require("./report.response");
import { YotiDate } from "../../../data_type/date";
import GeneratedMedia = require("./generated.media");
