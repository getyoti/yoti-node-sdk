export = IdentityProfileFailureReasonResponse;
/**
 * @typedef {Object} RequirementsNotMetDetail
 * @property {string} [failureType]
 * @property {string} [documentType]
 * @property {string} [documentCountryIsoCode]
 * @property {string} [auditId]
 * @property {string} [details]
 */
declare class IdentityProfileFailureReasonResponse {
    constructor(failureReason: any);
    /** @private */
    private reasonCode;
    /** @private  */
    private requirementsNotMetDetails;
    /**
     * @returns {string}
     */
    getReasonCode(): string;
    /**
     * @returns {RequirementsNotMetDetail[]}
     */
    getRequirementsNotMetDetails(): RequirementsNotMetDetail[];
}
declare namespace IdentityProfileFailureReasonResponse {
    export { RequirementsNotMetDetail };
}
type RequirementsNotMetDetail = {
    failureType?: string;
    documentType?: string;
    documentCountryIsoCode?: string;
    auditId?: string;
    details?: string;
};
