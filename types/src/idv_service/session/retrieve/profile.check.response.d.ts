export = ProfileCheckResponse;
declare class ProfileCheckResponse extends CheckResponse {
    /** @private */
    private generatedProfile;
    /**
     * @returns {GeneratedProfileResponse}
     */
    getGeneratedProfile(): GeneratedProfileResponse;
}
import CheckResponse = require("./check.response");
import GeneratedProfileResponse = require("./generated.profile.response");
