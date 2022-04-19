const GeneratedProfileResponse = require('./generated.profile.response');
const CheckResponse = require('./check.response');

class ThirdPartyIdentityFraud1CheckResponse extends CheckResponse {
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

module.exports = ThirdPartyIdentityFraud1CheckResponse;