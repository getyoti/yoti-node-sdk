export = GetSessionResult;
declare class GetSessionResult {
    constructor(response: any);
    clientSessionTokenTtl: any;
    sessionId: any;
    userTrackingId: any;
    state: any;
    clientSessionToken: any;
    checks: any;
    resources: ResourceContainer;
    biometricConsent: YotiDate;
    /**
     * @returns {string}
     */
    getSessionId(): string;
    /**
     * @returns {int}
     */
    getClientSessionTokenTtl(): any;
    /**
     * @returns {string}
     */
    getState(): string;
    /**
     * @returns {string}
     */
    getClientSessionToken(): string;
    /**
     * @returns {CheckResponse[]}
     */
    getChecks(): CheckResponse[];
    /**
     * @returns {AuthenticityCheckResponse[]}
     */
    getAuthenticityChecks(): AuthenticityCheckResponse[];
    /**
     * @returns {FaceMatchCheckResponse[]}
     */
    getFaceMatchChecks(): FaceMatchCheckResponse[];
    /**
     * @returns {TextDataCheckResponse[]}
     */
    getIdDocumentTextDataChecks(): TextDataCheckResponse[];
    /**
     * @deprecated replaced by getIdDocumentTextDataChecks()
     *
     * @returns {TextDataCheckResponse[]}
     */
    getTextDataChecks(): TextDataCheckResponse[];
    /**
     * @returns {SupplementaryDocumentTextDataCheckResponse[]}
     */
    getSupplementaryDocumentTextDataChecks(): SupplementaryDocumentTextDataCheckResponse[];
    /**
     * @returns {LivenessCheckResponse[]}
     */
    getLivenessChecks(): LivenessCheckResponse[];
    /**
     * @returns {IdDocumentComparisonCheckResponse[]}
     */
    getIdDocumentComparisonChecks(): IdDocumentComparisonCheckResponse[];
    /**
     * @returns {ThirdPartyIdentityCheckResponse[]}
     */
    getThirdPartyIdentityChecks(): ThirdPartyIdentityCheckResponse[];
    /**
     * @returns {ResourceContainer}
     */
    getResources(): ResourceContainer;
    /**
     * @returns {string}
     */
    getUserTrackingId(): string;
    /**
     * @returns {YotiDate}
     */
    getBiometricConsentTimestamp(): YotiDate;
}
import ResourceContainer = require("./resource.container");
import { YotiDate } from "../../../data_type/date";
import CheckResponse = require("./check.response");
import AuthenticityCheckResponse = require("./authenticity.check.response");
import FaceMatchCheckResponse = require("./face.match.check.response");
import TextDataCheckResponse = require("./text.data.check.response");
import SupplementaryDocumentTextDataCheckResponse = require("./supplementary.document.text.data.check.response");
import LivenessCheckResponse = require("./liveness.check.response");
import IdDocumentComparisonCheckResponse = require("./id.document.comparison.check.response");
import ThirdPartyIdentityCheckResponse = require("./third.party.identity.check.response");
