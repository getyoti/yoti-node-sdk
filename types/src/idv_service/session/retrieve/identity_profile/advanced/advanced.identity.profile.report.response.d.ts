export = AdvancedIdentityProfileReportResponse;
declare class AdvancedIdentityProfileReportResponse {
    constructor(report: any);
    /** @private {AdvancedIdentityProfileTrustFrameworkResponse[]} */
    private compliance;
    /** @private {MediaResponse} */
    private media;
    /**
     * @returns {AdvancedIdentityProfileTrustFrameworkResponse[]}
     */
    getCompliance(): AdvancedIdentityProfileTrustFrameworkResponse[];
    /**
     * @returns {MediaResponse}
     */
    getMedia(): MediaResponse;
}
import AdvancedIdentityProfileTrustFrameworkResponse = require("./advanced.identity.profile.trust.framework.response");
import MediaResponse = require("../../media.response");
