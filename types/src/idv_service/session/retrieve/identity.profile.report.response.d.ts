export = IdentityProfileReportResponse;
declare class IdentityProfileReportResponse {
    constructor(report: any);
    trustFramework: any;
    schemesCompliance: any;
    media: MediaResponse;
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
import MediaResponse = require("./media.response");
import IdentityProfileReportSchemesComplianceResponse = require("./identity.profile.report.schemes.compliance.response");
