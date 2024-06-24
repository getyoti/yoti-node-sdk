const AdvancedIdentityProfileSchemeComplianceResponse = require('../../../../../../src/idv_service/session/retrieve/identity_profile/advanced/advanced.identity.profile.report.scheme.compliance.response');
const AdvancedIdentityProfileTrustFrameworkResponse = require('../../../../../../src/idv_service/session/retrieve/identity_profile/advanced/advanced.identity.profile.trust.framework.response');

describe('AdvancedIdentityProfileTrustFrameworkResponse', () => {
  let advancedIdentityProfileTrustFrameworkResponse;

  beforeEach(() => {
    const response = {
      trust_framework: 'UK_TFIDA',
      schemes_compliance: [
        {
          requirements_met: true,
          scheme: {
            type: 'DBS',
            objective: 'STANDARD',
            label: 'dbs-standard',
          },
        },
        {
          requirements_met: false,
          requirements_not_met_info: 'HORRIBLE_FAILURE',
          scheme: {
            type: 'RTW',
            label: 'some-rtw',
          },
        },
      ],
    };

    // eslint-disable-next-line max-len
    advancedIdentityProfileTrustFrameworkResponse = new AdvancedIdentityProfileTrustFrameworkResponse(response);
  });

  describe('#getTrustFramework', () => {
    it('should return trust_framework', () => {
      // eslint-disable-next-line max-len
      const trustFramework = advancedIdentityProfileTrustFrameworkResponse.getTrustFramework();
      expect(trustFramework).toBe('UK_TFIDA');
    });
  });

  describe('#getSchemesCompliance', () => {
    it('should return schemes_compliance', () => {
      // eslint-disable-next-line max-len
      const schemesCompliance = advancedIdentityProfileTrustFrameworkResponse.getSchemesCompliance();
      expect(schemesCompliance).toHaveLength(2);
      expect(schemesCompliance[0]).toBeInstanceOf(AdvancedIdentityProfileSchemeComplianceResponse);
      expect(schemesCompliance[0]).toEqual(expect.objectContaining({
        requirementsMet: true,
        scheme: {
          label: 'dbs-standard',
          objective: 'STANDARD',
          type: 'DBS',
        },
      }));
      expect(schemesCompliance[1]).toBeInstanceOf(AdvancedIdentityProfileSchemeComplianceResponse);
      expect(schemesCompliance[1]).toEqual(expect.objectContaining({
        requirementsMet: false,
        requirementsNotMetInfo: 'HORRIBLE_FAILURE',
        scheme: {
          type: 'RTW',
          label: 'some-rtw',
        },
      }));
    });
  });
});
