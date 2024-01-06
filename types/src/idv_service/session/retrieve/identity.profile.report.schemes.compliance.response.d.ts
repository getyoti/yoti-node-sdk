export = IdentityProfileReportSchemesComplianceResponse;
declare class IdentityProfileReportSchemesComplianceResponse {
    constructor(schemesCompliance: any);
    /** @private */
    private scheme;
    /** @private */
    private requirementsMet;
    /** @private */
    private requirementsNotMetInfo;
    /**
     * @returns {object}
     */
    getScheme(): object;
    /**
     * @returns {boolean}
     */
    isRequirementsMet(): boolean;
    /**
     * @returns {string}
     */
    getRequirementsNotMetInfo(): string;
}
