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
    getId(): any;
    getDocumentType(): any;
    getIssuingCountry(): any;
    getProvider(): any;
    getCreatedAt(): any;
    getLastUpdated(): any;
    getResourceId(): any;
    getError(): DigitalIdShareErrorResponse;
}
import DigitalIdShareErrorResponse = require("./digital.id.share.error.response");
