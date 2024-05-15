export = IdentityProfileRequirementsNotMetDetailResponse;
declare class IdentityProfileRequirementsNotMetDetailResponse {
    constructor(requirementsNotMetDetail: any);
    /** @private string */
    private failureType;
    /** @private string */
    private documentType;
    /** @private string */
    private documentCountryIsoCode;
    /** @private string|undefined */
    private auditId;
    /** @private */
    private details;
    getFailureType(): any;
    getDocumentType(): any;
    getDocumentCountryIsoCode(): any;
    getAuditId(): any;
    getDetails(): any;
}
