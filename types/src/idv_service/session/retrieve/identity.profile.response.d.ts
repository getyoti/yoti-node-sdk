export = IdentityProfileResponse;
declare class IdentityProfileResponse {
    constructor(identityProfile: any);
    subjectId: any;
    result: any;
    failureReason: IdentityProfileFailureReasonResponse;
    identityProfileReport: IdentityProfileReportResponse;
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
import IdentityProfileFailureReasonResponse = require("./identity.profile.failure.reason.response");
import IdentityProfileReportResponse = require("./identity.profile.report.response");
