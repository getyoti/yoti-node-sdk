export = IdentityProfileReportSchemesComplianceResponse;
declare class IdentityProfileReportSchemesComplianceResponse {
    constructor(schemesCompliance: any);
    /** @private @type {IdentityProfileSchemeResponse} */
    private scheme;
    /** @private @type {boolean} */
    private requirementsMet;
    /** @private @type {string|undefined} */
    private requirementsNotMetInfo;
    /**
     * @returns {object}
     */
    getScheme(): object;
    isRequirementsMet(): boolean;
    getRequirementsNotMetInfo(): string;
}
