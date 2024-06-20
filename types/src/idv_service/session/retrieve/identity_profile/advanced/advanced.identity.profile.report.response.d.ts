export = AdvancedIdentityProfileReportResponse;
declare class AdvancedIdentityProfileReportResponse {
    constructor(report: any);
    /** @private {AdvancedIdentityProfileTrustFrameworkResponse[]} */
    private compliance;
    /** @private {MediaResponse} */
    private media;
    getCompliance(): any;
    getMedia(): MediaResponse;
}
import MediaResponse = require("../../media.response");
