export = IdentityProfileReportSchemesComplianceResponse;
declare class IdentityProfileReportSchemesComplianceResponse {
    constructor(schemesCompliance: any);
    /** @private */
    private scheme;
    /** @private @type {boolean} */
    private requirementsMet;
    /** @private @type {string|undefined} */
    private requirementsNotMetInfo;
    /** @private @type {IdentityProfileRequirementsNotMetDetailResponse[]|undefined} */
    private requirementsNotMetDetails;
    /**
     * @returns {object}
     */
    getScheme(): object;
    isRequirementsMet(): boolean;
    getRequirementsNotMetInfo(): string;
    getRequirementsNotMetDetails(): IdentityProfileRequirementsNotMetDetailResponse[];
}
import IdentityProfileRequirementsNotMetDetailResponse = require("./identity.profile.requirements.not.met.detail.response");
