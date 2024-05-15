export = IdentityProfileFailureReasonResponse;
declare class IdentityProfileFailureReasonResponse {
    constructor(failureReason: any);
    /** @private string */
    private reasonCode;
    /** @private {IdentityProfileRequirementsNotMetDetailResponse[]} */
    private requirementsNotMetDetails;
    getReasonCode(): any;
    getRequirementsNotMetDetails(): any;
}
