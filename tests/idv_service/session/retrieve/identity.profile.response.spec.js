const IdentityProfileResponse = require('../../../../src/idv_service/session/retrieve/identity.profile.response');
const IdentityProfileReportResponse = require('../../../../src/idv_service/session/retrieve/identity.profile.report.response');
const IdentityProfileFailureReasonResponse = require('../../../../src/idv_service/session/retrieve/identity.profile.failure.reason.response');

describe('IdentityProfileResponse', () => {
  let identityProfileResponse;

  beforeEach(() => {
    identityProfileResponse = new IdentityProfileResponse({
      subject_id: 'someStringHere',
      result: 'DONE',
      failure_reason: {
        reason_code: 'MANDATORY_DOCUMENT_COULD_NOT_BE_PROVIDED',
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

      expect(failureReason.getReasonCode()).toBe('MANDATORY_DOCUMENT_COULD_NOT_BE_PROVIDED');
    });
  });

  describe('#getIdentityProfileReport', () => {
    it('Should return instance of IdentityProfileReport', () => {
      expect(identityProfileResponse.getIdentityProfileReport())
        .toBeInstanceOf(IdentityProfileReportResponse);
    });
  });
});
