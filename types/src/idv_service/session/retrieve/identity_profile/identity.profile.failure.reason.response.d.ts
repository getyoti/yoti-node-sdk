export = IdentityProfileFailureReasonResponse;
declare class IdentityProfileFailureReasonResponse {
    constructor(failureReason: any);
    /** @private @type {string} */
    private reasonCode;
    /** @private @type {IdentityProfileRequirementsNotMetDetailResponse[]} */
    private requirementsNotMetDetails;
    getReasonCode(): string;
    getRequirementsNotMetDetails(): IdentityProfileRequirementsNotMetDetailResponse[];
}
import IdentityProfileRequirementsNotMetDetailResponse = require("./identity.profile.requirements.not.met.detail.response");
