const IdentityProfileReportSchemesComplianceResponse = require('../../../../src/idv_service/session/retrieve/identity.profile.report.schemes.compliance.response');
const IdentityProfileRequirementsNotMetDetailResponse = require('../../../../src/idv_service/session/retrieve/identity.profile.requirements.not.met.detail.response');

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
    });
  });

  describe('#getScheme', () => {
    it('Should return scheme object', () => {
      expect(identityProfileReportSchemesComplianceResponse.getScheme()).toMatchObject({
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

  describe('with requirements not met', () => {
    beforeAll(() => {
      identityProfileReportSchemesComplianceResponse = new
      IdentityProfileReportSchemesComplianceResponse({
        scheme: {
          type: 'DBS',
          objective: 'STANDARD',
        },
        requirements_met: false,
        requirements_not_met_info: 'some string here',
        requirements_not_met_details: [
          {
            failure_type: 'ID_DOCUMENT_EXTRACTION',
            document_type: 'PASSPORT',
            document_country_iso_code: 'GBR',
            audit_id: 'audit-123',
            details: 'something not right',
          },
          {
            failure_type: 'ID_DOCUMENT_AUTHENTICITY',
            document_type: 'PASSPORT',
            document_country_iso_code: 'GBR',
            audit_id: 'audit-456',
            details: 'something still not right',
          },
        ],
      });
    });
    describe('#getRequirementsNotMetInfo', () => {
      it('Should return requirements_not_met_info string', () => {
        expect(identityProfileReportSchemesComplianceResponse.getRequirementsNotMetInfo()).toBe('some string here');
      });
    });

    describe('#getRequirementsNotMetDetails', () => {
      it('Should return the list of RequirementsNotMetDetail', () => {
        // eslint-disable-next-line max-len
        const requirementsNotMetDetails = identityProfileReportSchemesComplianceResponse.getRequirementsNotMetDetails();
        expect(requirementsNotMetDetails).toHaveLength(2);
        const [firstDetail, secondDetail] = requirementsNotMetDetails;
        expect(firstDetail).toBeInstanceOf(IdentityProfileRequirementsNotMetDetailResponse);
        expect(firstDetail).toEqual(expect.objectContaining({
          failureType: 'ID_DOCUMENT_EXTRACTION',
          documentType: 'PASSPORT',
          documentCountryIsoCode: 'GBR',
          auditId: 'audit-123',
          details: 'something not right',
        }));
        expect(firstDetail).toBeInstanceOf(IdentityProfileRequirementsNotMetDetailResponse);
        expect(secondDetail).toEqual(expect.objectContaining({
          failureType: 'ID_DOCUMENT_AUTHENTICITY',
          documentType: 'PASSPORT',
          documentCountryIsoCode: 'GBR',
          auditId: 'audit-456',
          details: 'something still not right',
        }));
      });
    });
  });
});
