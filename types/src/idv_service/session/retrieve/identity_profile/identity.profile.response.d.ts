export = IdentityProfileResponse;
declare class IdentityProfileResponse {
    constructor(identityProfile: any);
    /** @private */
    private subjectId;
    /** @private */
    private result;
    /** @private */
    private failureReason;
    /** @private */
    private identityProfileReport;
    /**
     * @returns {string}
     */
    getSubjectId(): string;
    /**
     * @returns {string}
     */
    getResult(): string;
    /**
     * @returns {IdentityProfileFailureReasonResponse}
     */
    getFailureReason(): IdentityProfileFailureReasonResponse;
    /**
     * @returns {IdentityProfileReportResponse}
     */
    getIdentityProfileReport(): IdentityProfileReportResponse;
}
import IdentityProfileFailureReasonResponse = require("./identity.profile.failure.reason.response");
import IdentityProfileReportResponse = require("./identity.profile.report.response");
