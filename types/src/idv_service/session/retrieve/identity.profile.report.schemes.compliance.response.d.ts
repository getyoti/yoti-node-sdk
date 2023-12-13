export = IdentityProfileReportSchemesComplianceResponse;
declare class IdentityProfileReportSchemesComplianceResponse {
    constructor(schemesCompliance: any);
    scheme: any;
    requirementsMet: any;
    requirementsNotMetInfo: any;
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
