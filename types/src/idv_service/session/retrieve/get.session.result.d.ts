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
    identityProfile: IdentityProfileResponse;
    /**
     * @returns {string}
     */
    getSessionId(): string;
    /**
     * @returns {number}
     */
    getClientSessionTokenTtl(): number;
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
     * @returns {WatchlistScreeningCheckResponse[]}
     */
    getWatchlistScreeningChecks(): WatchlistScreeningCheckResponse[];
    /**
     * @returns {WatchlistAdvancedCaCheckResponse[]}
     */
    getWatchlistAdvancedCaChecks(): WatchlistAdvancedCaCheckResponse[];
    /**
     * @returns {ThirdPartyIdentityFraud1CheckResponse[]}
     */
    getThirdPartyIdentityFraud1Checks(): ThirdPartyIdentityFraud1CheckResponse[];
    getFaceComparisonChecks(): CheckResponse[];
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
    /**
     * @returns {IdentityProfileResponse}
     */
    getIdentityProfile(): IdentityProfileResponse;
}
import ResourceContainer = require("./resource.container");
import { YotiDate } from "../../../data_type/date";
import IdentityProfileResponse = require("./identity.profile.response");
import CheckResponse = require("./check.response");
import AuthenticityCheckResponse = require("./authenticity.check.response");
import FaceMatchCheckResponse = require("./face.match.check.response");
import TextDataCheckResponse = require("./text.data.check.response");
import SupplementaryDocumentTextDataCheckResponse = require("./supplementary.document.text.data.check.response");
import LivenessCheckResponse = require("./liveness.check.response");
import IdDocumentComparisonCheckResponse = require("./id.document.comparison.check.response");
import ThirdPartyIdentityCheckResponse = require("./third.party.identity.check.response");
import WatchlistScreeningCheckResponse = require("./watchlist.screening.check.response");
import WatchlistAdvancedCaCheckResponse = require("./watchlist.advanced.ca.check.response");
import ThirdPartyIdentityFraud1CheckResponse = require("./third.party.identity.fraud.1.check.response");
