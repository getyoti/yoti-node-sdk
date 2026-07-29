const DigitalIdShareResponse = require('../../../../src/idv_service/session/retrieve/digital.id.share.response');
const DigitalIdShareErrorResponse = require('../../../../src/idv_service/session/retrieve/digital.id.share.error.response');
const { YotiDate } = require('../../../../src/data_type/date');

describe('DigitalIdShareResponse', () => {
  const rawResponse = {
    id: 'fffe3bcf-ccd4-4704-ac85-3cdae5bd9eaf',
    document_type: 'EPHIL_ID',
    issuing_country: 'PHL',
    provider: 'EPHIL_ID_QR',
    created_at: '2026-06-29T10:00:50Z',
    last_updated: '2026-06-29T10:01:01Z',
    resource_id: 'a159072f-22b9-4fb0-8098-aa5bc8eb7615',
  };

  const rawResponseWithError = {
    ...rawResponse,
    error: {
      code: 'BAD_SHARE',
      description: 'This is a really bad share',
    },
  };

  let digitalIdShareResponse;

  beforeEach(() => {
    digitalIdShareResponse = new DigitalIdShareResponse(rawResponse);
  });

  describe('#getId', () => {
    it('should return id', () => {
      expect(digitalIdShareResponse.getId()).toBe('fffe3bcf-ccd4-4704-ac85-3cdae5bd9eaf');
    });
  });

  describe('#getDocumentType', () => {
    it('should return document type', () => {
      expect(digitalIdShareResponse.getDocumentType()).toBe('EPHIL_ID');
    });
  });

  describe('#getIssuingCountry', () => {
    it('should return issuing country', () => {
      expect(digitalIdShareResponse.getIssuingCountry()).toBe('PHL');
    });
  });

  describe('#getProvider', () => {
    it('should return provider', () => {
      expect(digitalIdShareResponse.getProvider()).toBe('EPHIL_ID_QR');
    });
  });

  describe('#getCreatedAt', () => {
    it('should return created at date', () => {
      expect(digitalIdShareResponse.getCreatedAt()).toBeInstanceOf(YotiDate);
      expect(digitalIdShareResponse.getCreatedAt().toISOString()).toBe('2026-06-29T10:00:50.000Z');
    });
  });

  describe('#getLastUpdated', () => {
    it('should return created at date', () => {
      expect(digitalIdShareResponse.getLastUpdated()).toBeInstanceOf(YotiDate);
      expect(digitalIdShareResponse.getLastUpdated().toISOString()).toBe('2026-06-29T10:01:01.000Z');
    });
  });

  describe('#getResourceId', () => {
    it('should return resource id', () => {
      expect(digitalIdShareResponse.getResourceId()).toBe('a159072f-22b9-4fb0-8098-aa5bc8eb7615');
    });
  });

  describe('#getError', () => {
    it('should return undefined when no error', () => {
      expect(digitalIdShareResponse.getError()).toBe(undefined);
    });

    it('should return error if present', () => {
      digitalIdShareResponse = new DigitalIdShareResponse(rawResponseWithError);
      expect(digitalIdShareResponse.getError()).toBeInstanceOf(DigitalIdShareErrorResponse);

      const digitalIdShareErrorResponse = digitalIdShareResponse.getError();
      expect(digitalIdShareErrorResponse.getCode()).toBe('BAD_SHARE');
      expect(digitalIdShareErrorResponse.getDescription()).toBe('This is a really bad share');
    });
  });
});
