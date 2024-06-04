export = IdentityProfileRequirementsNotMetDetailResponse;
declare class IdentityProfileRequirementsNotMetDetailResponse {
    constructor(requirementsNotMetDetail: any);
    /** @private @type {string} */
    private failureType;
    /** @private @type {string} */
    private documentType;
    /** @private @type {string} */
    private documentCountryIsoCode;
    /** @private @type {string|undefined} */
    private auditId;
    /** @private @type {string} */
    private details;
    getFailureType(): string;
    getDocumentType(): string;
    getDocumentCountryIsoCode(): string;
    getAuditId(): string;
    getDetails(): string;
}
