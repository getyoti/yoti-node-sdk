export = IdentityProfileRequirementsNotMetDetailResponse;
declare class IdentityProfileRequirementsNotMetDetailResponse {
    constructor(requirementsNotMetDetail: any);
    /** @private {string} */
    private failureType;
    /** @private {string|undefined} */
    private documentType;
    /** @private {string|undefined} */
    private documentCountryIsoCode;
    /** @private {string|undefined} */
    private auditId;
    /** @private {string} */
    private details;
    /**
     * @returns {string}
     */
    getFailureType(): string;
    /**
     * @returns {string}
     */
    getDocumentType(): string;
    /**
     * @returns {string}
     */
    getDocumentCountryIsoCode(): string;
    /**
     * @returns {string|undefined}
     */
    getAuditId(): string | undefined;
    /**
     * @returns {string}
     */
    getDetails(): string;
}
