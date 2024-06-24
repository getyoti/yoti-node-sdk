const AdvancedIdentityProfileSchemeResponse = require('../../../../../../src/idv_service/session/retrieve/identity_profile/advanced/advanced.identity.profile.scheme.response');
const AdvancedIdentityProfileReportSchemeComplianceResponse = require('../../../../../../src/idv_service/session/retrieve/identity_profile/advanced/advanced.identity.profile.report.scheme.compliance.response');

const schemeResponse = {
  type: 'DBS',
  objective: 'STANDARD',
  label: 'dbs-standard',
};

describe('AdvancedIdentityProfileReportSchemeComplianceResponse', () => {
  let advancedIdentityProfileReportSchemeComplianceResponse;

  describe('with requirements met', () => {
    beforeEach(() => {
      const responseWithMetRequirements = {
        requirements_met: true,
        scheme: schemeResponse,
      };
      // eslint-disable-next-line max-len
      advancedIdentityProfileReportSchemeComplianceResponse = new AdvancedIdentityProfileReportSchemeComplianceResponse(responseWithMetRequirements);
    });

    describe('#getScheme', () => {
      it('should return scheme', () => {
        const scheme = advancedIdentityProfileReportSchemeComplianceResponse.getScheme();
        expect(scheme).toBeInstanceOf(AdvancedIdentityProfileSchemeResponse);
        expect(scheme.getType()).toBe('DBS');
        expect(scheme.getObjective()).toBe('STANDARD');
        expect(scheme.getLabel()).toBe('dbs-standard');
      });
    });

    describe('#getRequirementsMet', () => {
      it('should return requirements_met', () => {
        // eslint-disable-next-line max-len
        expect(advancedIdentityProfileReportSchemeComplianceResponse.getRequirementsMet()).toBe(true);
      });
    });
  });
  describe('with requirements not met', () => {
    beforeEach(() => {
      const responseWithNotMetRequirements = {
        requirements_met: false,
        requirements_not_met_info: 'SOMETHING_FAILED',
        scheme: schemeResponse,
      };
      // eslint-disable-next-line max-len
      advancedIdentityProfileReportSchemeComplianceResponse = new AdvancedIdentityProfileReportSchemeComplianceResponse(responseWithNotMetRequirements);
    });

    describe('#getScheme', () => {
      it('should return scheme', () => {
        const scheme = advancedIdentityProfileReportSchemeComplianceResponse.getScheme();
        expect(scheme).toBeInstanceOf(AdvancedIdentityProfileSchemeResponse);
        expect(scheme.getType()).toBe('DBS');
        expect(scheme.getObjective()).toBe('STANDARD');
        expect(scheme.getLabel()).toBe('dbs-standard');
      });
    });

    describe('#getRequirementsMet', () => {
      it('should return requirements_met', () => {
        // eslint-disable-next-line max-len
        expect(advancedIdentityProfileReportSchemeComplianceResponse.getRequirementsMet()).toBe(false);
      });
    });
    describe('#getRequirementsMet', () => {
      it('should return requirements_met', () => {
        // eslint-disable-next-line max-len
        expect(advancedIdentityProfileReportSchemeComplianceResponse.getRequirementsNotMetInfo()).toBe('SOMETHING_FAILED');
      });
    });
  });
});
