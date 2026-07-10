export = DigitalIdShareResponse;
declare class DigitalIdShareResponse {
    constructor(response: any);
    /** @private */
    private id;
    /** @private */
    private documentType;
    /** @private */
    private issuingCountry;
    /** @private */
    private provider;
    /** @private */
    private createdAt;
    /** @private */
    private lastUpdated;
    /** @private */
    private resourceId;
    error: DigitalIdShareErrorResponse;
    /**
     * @returns {string}
     */
    getId(): string;
    /**
     * @returns {string}
     */
    getDocumentType(): string;
    /**
     * @returns {string}
     */
    getIssuingCountry(): string;
    /**
     * @returns {string}
     */
    getProvider(): string;
    /**
     * @returns {YotiDate}
     */
    getCreatedAt(): YotiDate;
    /**
     * @returns {YotiDate}
     */
    getLastUpdated(): YotiDate;
    /**
     * @returns {string}
     */
    getResourceId(): string;
    /**
     * @returns {DigitalIdShareErrorResponse|undefined}
     */
    getError(): DigitalIdShareErrorResponse | undefined;
}
import DigitalIdShareErrorResponse = require("./digital.id.share.error.response");
import { YotiDate } from "../../../data_type/date";
