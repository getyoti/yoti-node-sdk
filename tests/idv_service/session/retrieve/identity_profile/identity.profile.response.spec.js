const IdentityProfileResponse = require('../../../../../src/idv_service/session/retrieve/identity_profile/identity.profile.response');
const IdentityProfileReportResponse = require('../../../../../src/idv_service/session/retrieve/identity_profile/identity.profile.report.response');
const IdentityProfileFailureReasonResponse = require('../../../../../src/idv_service/session/retrieve/identity_profile/identity.profile.failure.reason.response');
const IdentityProfileRequirementsNotMetDetailResponse = require('../../../../../src/idv_service/session/retrieve/identity_profile/identity.profile.requirements.not.met.detail.response');

describe('IdentityProfileResponse', () => {
  let identityProfileResponse;

  beforeEach(() => {
    identityProfileResponse = new IdentityProfileResponse({
      subject_id: 'someStringHere',
      result: 'DONE',
      failure_reason: {
        reason_code: 'MANDATORY_DOCUMENT_NOT_PROVIDED',
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
      },
      identity_profile_report: {
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
      },
    });
  });

  describe('#getSubjectId', () => {
    it('Should return ID', () => {
      expect(identityProfileResponse.getSubjectId()).toBe('someStringHere');
    });
  });

  describe('#getResult', () => {
    it('Should return result string', () => {
      expect(identityProfileResponse.getResult()).toBe('DONE');
    });
  });

  describe('#getFailureReason', () => {
    it('Should return failureReason object', () => {
      const failureReason = identityProfileResponse.getFailureReason();
      expect(failureReason)
        .toBeInstanceOf(IdentityProfileFailureReasonResponse);

      expect(failureReason.getReasonCode()).toBe('MANDATORY_DOCUMENT_NOT_PROVIDED');
      expect(failureReason.getRequirementsNotMetDetails()).toHaveLength(2);
      const [firstDetail, secondDetail] = failureReason.getRequirementsNotMetDetails();
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

  describe('#getIdentityProfileReport', () => {
    it('Should return instance of IdentityProfileReport', () => {
      expect(identityProfileResponse.getIdentityProfileReport())
        .toBeInstanceOf(IdentityProfileReportResponse);
    });
  });
});
