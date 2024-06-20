const IdentityProfileReportSchemesComplianceResponse = require('../../../../../src/idv_service/session/retrieve/identity_profile/identity.profile.report.schemes.compliance.response');
const IdentityProfileSchemeResponse = require('../../../../../src/idv_service/session/retrieve/identity_profile/identity.profile.scheme.response');

describe('IdentityProfileReportSchemesComplianceResponse', () => {
  let identityProfileReportSchemesComplianceResponse;

  beforeAll(() => {
    identityProfileReportSchemesComplianceResponse = new
    IdentityProfileReportSchemesComplianceResponse({
      scheme: {
        type: 'DBS',
        objective: 'STANDARD',
      },
      requirements_met: true,
      requirements_not_met_info: 'some string here',
    });
  });

  describe('#getScheme', () => {
    it('Should return scheme object', () => {
      const scheme = identityProfileReportSchemesComplianceResponse.getScheme();
      expect(scheme).toBeInstanceOf(IdentityProfileSchemeResponse);
      expect(scheme).toMatchObject({
        type: 'DBS',
        objective: 'STANDARD',
      });
    });
  });

  describe('#isRequirementsMet', () => {
    it('Should return requirements_met boolean', () => {
      expect(identityProfileReportSchemesComplianceResponse.isRequirementsMet()).toBe(true);
    });
  });

  describe('#getRequirementsNotMetInfo', () => {
    it('Should return requirements_not_met_info string', () => {
      expect(identityProfileReportSchemesComplianceResponse.getRequirementsNotMetInfo()).toBe('some string here');
    });
  });
});
