export = IdentityProfileReportSchemesComplianceResponse;
declare class IdentityProfileReportSchemesComplianceResponse {
    constructor(schemesCompliance: any);
    /** @private {IdentityProfileSchemeResponse} */
    private scheme;
    /** @private {boolean} */
    private requirementsMet;
    /** @private {string|undefined} */
    private requirementsNotMetInfo;
    /**
     * @returns {IdentityProfileSchemeResponse}
     */
    getScheme(): IdentityProfileSchemeResponse;
    /**
     * @returns {boolean}
     */
    isRequirementsMet(): boolean;
    /**
     * @returns {string|undefined}
     */
    getRequirementsNotMetInfo(): string | undefined;
}
import IdentityProfileSchemeResponse = require("./identity.profile.scheme.response");
