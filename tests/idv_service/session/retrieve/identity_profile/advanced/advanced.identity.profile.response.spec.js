const IdentityProfileFailureReasonResponse = require('../../../../../../src/idv_service/session/retrieve/identity.profile.failure.reason.response');
const IdentityProfileRequirementsNotMetDetailResponse = require('../../../../../../src/idv_service/session/retrieve/identity.profile.requirements.not.met.detail.response');
const AdvancedIdentityProfileReportResponse = require('../../../../../../src/idv_service/session/retrieve/identity_profile/advanced/advanced.identity.profile.report.response');
const AdvancedIdentityProfileResponse = require('../../../../../../src/idv_service/session/retrieve/identity_profile/advanced/advanced.identity.profile.response');

const reportResponse = {
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

describe('AdvancedIdentityProfileResponse', () => {
  let advancedIdentityProfileResponse;

  beforeEach(() => {
    const response = {
      subject_id: 'some-subject',
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
      identity_profile_report: reportResponse,
    };

    advancedIdentityProfileResponse = new AdvancedIdentityProfileResponse(response);
  });

  describe('#getSubjectId', () => {
    it('Should return ID', () => {
      expect(advancedIdentityProfileResponse.getSubjectId()).toBe('some-subject');
    });
  });

  describe('#getResult', () => {
    it('Should return result string', () => {
      expect(advancedIdentityProfileResponse.getResult()).toBe('DONE');
    });
  });

  describe('#getFailureReason', () => {
    it('Should return failureReason object', () => {
      const failureReason = advancedIdentityProfileResponse.getFailureReason();
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
      const report = advancedIdentityProfileResponse.getIdentityProfileReport();
      expect(report).toBeInstanceOf(AdvancedIdentityProfileReportResponse);
      expect(report.getCompliance()).toHaveLength(2);
    });
  });
});
