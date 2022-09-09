const CheckResponse = require('./check.response');
const GeneratedProfileResponse = require('./generated.profile.response');

class ProfileCheckResponse extends CheckResponse {
  constructor(check) {
    super(check);

    if (check.generated_profile) {
      this.generatedProfile = new GeneratedProfileResponse(check.generated_profile);
    }
  }

  /**
   * @returns {GeneratedProfileResponse}
   */
  getGeneratedProfile() {
    return this.generatedProfile;
  }
}

module.exports = ProfileCheckResponse;
