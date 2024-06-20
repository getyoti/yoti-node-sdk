export = AdvancedIdentityProfileSchemeComplianceResponse;
declare class AdvancedIdentityProfileSchemeComplianceResponse {
    constructor(schemesCompliance: any);
    /** @private {AdvancedIdentityProfileSchemeResponse} */
    private scheme;
    /** @private {boolean} */
    private requirementsMet;
    /** @private {string|undefined} */
    private requirementsNotMetInfo;
    getScheme(): AdvancedIdentityProfileSchemeResponse;
    getRequirementsMet(): any;
    getRequirementsNotMetInfo(): any;
}
import AdvancedIdentityProfileSchemeResponse = require("./advanced.identity.profile.scheme.response");
