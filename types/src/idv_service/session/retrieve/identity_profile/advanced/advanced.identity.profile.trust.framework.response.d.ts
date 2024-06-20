export = AdvancedIdentityProfileTrustFrameworkResponse;
declare class AdvancedIdentityProfileTrustFrameworkResponse {
    constructor(trustFrameworkCompliance: any);
    /** @private {string} */
    private trustFramework;
    /** @private {AdvancedIdentityProfileSchemeComplianceResponse[]} */
    private schemesCompliance;
    getTrustFramework(): any;
    getSchemesCompliance(): any;
}
