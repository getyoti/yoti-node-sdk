export = AdvancedIdentityProfileTrustFrameworkResponse;
declare class AdvancedIdentityProfileTrustFrameworkResponse {
    constructor(trustFrameworkCompliance: any);
    /** @private {string} */
    private trustFramework;
    /** @private {AdvancedIdentityProfileSchemeComplianceResponse[]} */
    private schemesCompliance;
    /**
     * @returns {string}
     */
    getTrustFramework(): string;
    /**
     * @returns {AdvancedIdentityProfileSchemeComplianceResponse[]}
     */
    getSchemesCompliance(): AdvancedIdentityProfileSchemeComplianceResponse[];
}
import AdvancedIdentityProfileSchemeComplianceResponse = require("./advanced.identity.profile.report.scheme.compliance.response");
