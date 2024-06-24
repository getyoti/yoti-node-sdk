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
     * @returns {AdvancedIdentityProfileReportResponse|undefined}
     */
    getIdentityProfileReport(): AdvancedIdentityProfileReportResponse | undefined;
}
import IdentityProfileFailureReasonResponse = require("../identity.profile.failure.reason.response");
import AdvancedIdentityProfileReportResponse = require("./advanced.identity.profile.report.response");
