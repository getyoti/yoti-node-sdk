const IdentityProfileReportResponse = require('../../../../src/idv_service/session/retrieve/identity.profile.report.response');
const IdentityProfileReportSchemesComplianceResponse = require('../../../../src/idv_service/session/retrieve/identity.profile.report.schemes.compliance.response');
const MediaResponse = require('../../../../src/idv_service/session/retrieve/media.response');

describe('IdentityProfileResponseReport', () => {
  let identityProfileReportResponse;

  beforeAll(() => {
    identityProfileReportResponse = new IdentityProfileReportResponse({
      trust_framework: 'UK_TFIDA',
      schemes_compliance: [
        {
          scheme: {
            type: 'DBS',
            objective: 'STANDARD',
          },
          requirements_met: true,
          requirements_not_met_info: 'some string here',
        },
      ],
      media: {
        id: 'c69ff2db-6caf-4e74-8386-037711bbc8d7',
        type: 'IMAGE',
        created: '2022-03-29T11:39:24Z',
        last_updated: '2022-03-29T11:39:24Z',
      },
    });
  });

  describe('#getTrustFramework', () => {
    it('Should return getTrustFramework string', () => {
      expect(identityProfileReportResponse.getTrustFramework()).toBe('UK_TFIDA');
    });
  });

  describe('#getSchemesCompliance', () => {
    it('Should return instance of IdentityProfileReportSchemesComplianceResponse', () => {
      const schemesCompliance = identityProfileReportResponse.getSchemesCompliance();
      schemesCompliance.forEach((schemeCompliance) => expect(schemeCompliance)
        .toBeInstanceOf(IdentityProfileReportSchemesComplianceResponse));
    });
  });

  describe('#getMedia', () => {
    it('Should return instance of MediaResponse', () => {
      expect(identityProfileReportResponse.getMedia()).toBeInstanceOf(MediaResponse);
    });
  });
});
