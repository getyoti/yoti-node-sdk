export = AdvancedIdentityProfileResponse;
declare class AdvancedIdentityProfileResponse {
    constructor(response: any);
    /** @private {string} */
    private subjectId;
    /** @private {string} */
    private result;
    /** @private {IdentityProfileFailureReasonResponse} */
    private failureReason;
    /** @private {AdvancedIdentityProfileReportResponse} */
    private identityProfileReport;
    getSubjectId(): any;
    getResult(): any;
    getFailureReason(): IdentityProfileFailureReasonResponse;
    getIdentityProfileReport(): AdvancedIdentityProfileReportResponse;
}
import IdentityProfileFailureReasonResponse = require("../identity.profile.failure.reason.response");
import AdvancedIdentityProfileReportResponse = require("./advanced.identity.profile.report.response");
