const ThirdPartyIdentityFraud1CheckResponse = require('../../../../src/doc_scan_service/session/retrieve/third.party.identity.fraud.1.check.response');
const GeneratedProfileResponse = require('../../../../src/doc_scan_service/session/retrieve/generated.profile.response');

describe('ThirdPartyIdentityFraud1CheckResponse', () => {
  let thirdPartyIdentityFraud1Check;
  beforeAll(() => {
    thirdPartyIdentityFraud1Check = new ThirdPartyIdentityFraud1CheckResponse({
      type: 'THIRD_PARTY_IDENTITY_FRAUD_1',
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      state: 'CREATED',
      created: '2021-06-11T11:39:24Z',
      last_updated: '2021-06-11T11:39:24Z',
      resources_used: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
      generated_media: [{}],
      generated_profile: { },
      report: {
        recommendation: { value: 'APPROVE' },
        breakdown: [],
      },
    });
  });

  describe('#getGeneratedProfile inherited from ProfileCheckResponse', () => {
    it('Should include generate_profile as generatedProfileResponse', () => {
      expect(thirdPartyIdentityFraud1Check.getGeneratedProfile())
        .toBeInstanceOf(GeneratedProfileResponse);
    });
  });
});
