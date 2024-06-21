export = AdvancedIdentityProfileSchemeComplianceResponse;
declare class AdvancedIdentityProfileSchemeComplianceResponse {
    constructor(schemesCompliance: any);
    /** @private {AdvancedIdentityProfileSchemeResponse} */
    private scheme;
    /** @private {boolean} */
    private requirementsMet;
    /** @private {string|undefined} */
    private requirementsNotMetInfo;
    /**
     * @returns {AdvancedIdentityProfileSchemeResponse}
     */
    getScheme(): AdvancedIdentityProfileSchemeResponse;
    /**
     * @returns {boolean}
     */
    getRequirementsMet(): boolean;
    /**
     *
     * @returns {string|undefined}
     */
    getRequirementsNotMetInfo(): string | undefined;
}
import AdvancedIdentityProfileSchemeResponse = require("./advanced.identity.profile.scheme.response");
