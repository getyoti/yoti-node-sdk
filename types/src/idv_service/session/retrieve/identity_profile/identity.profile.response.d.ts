export = IdentityProfileResponse;
declare class IdentityProfileResponse {
    constructor(identityProfile: any);
    /** @private {string|undefined} */
    private subjectId;
    /** @private {string} */
    private result;
    /** @private {IdentityProfileFailureReasonResponse|undefined} */
    private failureReason;
    /** @private  {IdentityProfileReportResponse|undefined} */
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
     * @returns {IdentityProfileFailureReasonResponse|undefined}
     */
    getFailureReason(): IdentityProfileFailureReasonResponse | undefined;
    /**
     * @returns {IdentityProfileReportResponse|undefined}
     */
    getIdentityProfileReport(): IdentityProfileReportResponse | undefined;
}
import IdentityProfileFailureReasonResponse = require("./identity.profile.failure.reason.response");
import IdentityProfileReportResponse = require("./identity.profile.report.response");
