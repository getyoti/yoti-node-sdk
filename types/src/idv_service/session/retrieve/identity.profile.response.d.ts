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
     * @returns {object}
     */
    getFailureReason(): object;
    /**
     * @returns {IdentityProfileReportResponse}
     */
    getIdentityProfileReport(): IdentityProfileReportResponse;
}
import IdentityProfileReportResponse = require("./identity.profile.report.response");
