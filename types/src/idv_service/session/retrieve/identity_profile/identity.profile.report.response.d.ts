export = IdentityProfileReportResponse;
declare class IdentityProfileReportResponse {
    constructor(report: any);
    /** @private {string} */
    private trustFramework;
    /** @private {IdentityProfileReportSchemesComplianceResponse[]} */
    private schemesCompliance;
    /** @private {MediaResponse} */
    private media;
    /**
     * @returns {string}
     */
    getTrustFramework(): string;
    /**
     * @returns {IdentityProfileReportSchemesComplianceResponse[]}
     */
    getSchemesCompliance(): IdentityProfileReportSchemesComplianceResponse[];
    /**
     * @returns {MediaResponse}
     */
    getMedia(): MediaResponse;
}
import IdentityProfileReportSchemesComplianceResponse = require("./identity.profile.report.schemes.compliance.response");
import MediaResponse = require("../media.response");
