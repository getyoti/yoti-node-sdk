export = ProfileCheckResponse;
declare class ProfileCheckResponse extends CheckResponse {
    generatedProfile: GeneratedProfileResponse;
    /**
     * @returns {GeneratedProfileResponse}
     */
    getGeneratedProfile(): GeneratedProfileResponse;
}
import CheckResponse = require("./check.response");
import GeneratedProfileResponse = require("./generated.profile.response");
