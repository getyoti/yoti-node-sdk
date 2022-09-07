const ThirdPartyIdentityFraud1CheckResponse = require('../../../../src/idv_service/session/retrieve/third.party.identity.fraud.1.check.response');
const ProfileCheckResponse = require('../../../../src/idv_service/session/retrieve/profile.check.response');

describe('ThirdPartyIdentityFraud1CheckResponse', () => {
  it('is a class that extends ProfileCheckResponse', () => {
    expect(ThirdPartyIdentityFraud1CheckResponse.prototype)
      .toBeInstanceOf(ProfileCheckResponse);
  });
});
