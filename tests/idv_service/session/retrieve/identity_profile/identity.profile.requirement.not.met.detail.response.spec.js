const IdentityProfileRequirementsNotMetDetailResponse = require('../../../../../src/idv_service/session/retrieve/identity_profile/identity.profile.requirements.not.met.detail.response');

describe('IdentityProfileRequirementsNotMetDetailResponse', () => {
  let requirementsNotMetDetailResponse;

  beforeEach(() => {
    requirementsNotMetDetailResponse = new IdentityProfileRequirementsNotMetDetailResponse({
      failure_type: 'ID_DOCUMENT_EXTRACTION',
      document_type: 'PASSPORT',
      document_country_iso_code: 'GBR',
      audit_id: 'audit-123',
      details: 'something not right',
    });
  });

  describe('#getFailureType', () => {
    it('Should return the failure type', () => {
      expect(requirementsNotMetDetailResponse.getFailureType()).toBe('ID_DOCUMENT_EXTRACTION');
    });
  });

  describe('#getDocumentType', () => {
    it('Should return the document type', () => {
      expect(requirementsNotMetDetailResponse.getDocumentType()).toBe('PASSPORT');
    });
  });

  describe('#getDocumentCountryIsoCode', () => {
    it('Should return the document country iso code', () => {
      expect(requirementsNotMetDetailResponse.getDocumentCountryIsoCode()).toBe('GBR');
    });
  });

  describe('#getAuditId', () => {
    it('Should return the audit ID', () => {
      expect(requirementsNotMetDetailResponse.getAuditId()).toBe('audit-123');
    });
  });

  describe('#getDetails', () => {
    it('Should return the details', () => {
      expect(requirementsNotMetDetailResponse.getDetails()).toBe('something not right');
    });
  });

  describe('default instance object', () => {
    it('Should return an object with all the fields', () => {
      expect(requirementsNotMetDetailResponse).toEqual(expect.objectContaining({
        failureType: 'ID_DOCUMENT_EXTRACTION',
        documentType: 'PASSPORT',
        documentCountryIsoCode: 'GBR',
        auditId: 'audit-123',
        details: 'something not right',
      }));
    });
  });
});
