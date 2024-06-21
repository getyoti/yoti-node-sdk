export = IdentityProfileFailureReasonResponse;
declare class IdentityProfileFailureReasonResponse {
    constructor(failureReason: any);
    /** @private {string} */
    private reasonCode;
    /** @private {IdentityProfileRequirementsNotMetDetailResponse[]} */
    private requirementsNotMetDetails;
    /**
     * @returns {string}
     */
    getReasonCode(): string;
    /**
     * @returns {IdentityProfileRequirementsNotMetDetailResponse[]}
     */
    getRequirementsNotMetDetails(): IdentityProfileRequirementsNotMetDetailResponse[];
}
import IdentityProfileRequirementsNotMetDetailResponse = require("./identity.profile.requirements.not.met.detail.response");
