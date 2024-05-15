export = IdentityProfileReportSchemesComplianceResponse;
declare class IdentityProfileReportSchemesComplianceResponse {
    constructor(schemesCompliance: any);
    /** @private */
    private scheme;
    /** @private boolean */
    private requirementsMet;
    /** @private string|undefined */
    private requirementsNotMetInfo;
    /** @private {IdentityProfileRequirementsNotMetDetailResponse[]}|undefined */
    private requirementsNotMetDetails;
    /**
     * @returns {object}
     */
    getScheme(): object;
    isRequirementsMet(): any;
    getRequirementsNotMetInfo(): any;
    getRequirementsNotMetDetails(): any;
}
