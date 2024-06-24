const AdvancedIdentityProfileTrustFrameworkResponse = require('../../../../../../src/idv_service/session/retrieve/identity_profile/advanced/advanced.identity.profile.trust.framework.response');
const AdvancedIdentityProfileReportResponse = require('../../../../../../src/idv_service/session/retrieve/identity_profile/advanced/advanced.identity.profile.report.response');
const MediaResponse = require('../../../../../../src/idv_service/session/retrieve/media.response');

describe('AdvancedIdentityProfileTrustFrameworkComplianceResponse', () => {
  let advancedIdentityProfileReportResponse;

  beforeEach(() => {
    const response = {
      compliance: [
        {
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
                label: 'some-RTW',
              },
            },
          ],
        },
        {
          trust_framework: 'YOTI_GLOBAL',
          schemes_compliance: [
            {
              requirements_met: true,
              scheme: {
                type: 'IDENTITY',
                objective: 'AL_M1',
                label: 'identity-AL-M1',
              },
            },
            {
              requirements_met: false,
              requirements_not_met_info: 'HORRIBLE_FAILURE',
              scheme: {
                type: 'IDENTITY',
                objective: 'AL_L1',
                label: 'identity-AL-L1',
              },
            },
          ],
        },
      ],
      media: {},
    };

    // eslint-disable-next-line max-len
    advancedIdentityProfileReportResponse = new AdvancedIdentityProfileReportResponse(response);
  });

  describe('#getCompliance', () => {
    it('should return compliance', () => {
      const compliance = advancedIdentityProfileReportResponse.getCompliance();
      expect(compliance).toHaveLength(2);
      expect(compliance[0]).toBeInstanceOf(AdvancedIdentityProfileTrustFrameworkResponse);
      expect(compliance[0].getTrustFramework()).toBe('UK_TFIDA');
      expect(compliance[0].getSchemesCompliance()).toHaveLength(2);
      expect(compliance[0].getSchemesCompliance()).toEqual(expect.arrayContaining([
        expect.objectContaining({
          requirementsMet: true,
          scheme: {
            type: 'DBS',
            objective: 'STANDARD',
            label: 'dbs-standard',
          },
        }),
        expect.objectContaining({
          requirementsMet: false,
          requirementsNotMetInfo: 'HORRIBLE_FAILURE',
          scheme: {
            type: 'RTW',
            label: 'some-RTW',
          },
        }),
      ]));

      expect(compliance[1]).toBeInstanceOf(AdvancedIdentityProfileTrustFrameworkResponse);
      expect(compliance[1].getTrustFramework()).toBe('YOTI_GLOBAL');
      expect(compliance[1].getSchemesCompliance()).toHaveLength(2);
      expect(compliance[1].getSchemesCompliance()).toEqual(expect.arrayContaining([
        expect.objectContaining({
          requirementsMet: true,
          scheme: {
            type: 'IDENTITY',
            objective: 'AL_M1',
            label: 'identity-AL-M1',
          },
        }),
        expect.objectContaining({
          requirementsMet: false,
          requirementsNotMetInfo: 'HORRIBLE_FAILURE',
          scheme: {
            type: 'IDENTITY',
            objective: 'AL_L1',
            label: 'identity-AL-L1',
          },
        }),
      ]));
    });
  });

  describe('#getMedia', () => {
    it('should return media', () => {
      expect(advancedIdentityProfileReportResponse.getMedia()).toBeInstanceOf(MediaResponse);
    });
  });
});
