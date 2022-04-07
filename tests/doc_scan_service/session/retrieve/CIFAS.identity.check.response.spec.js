const CIFASIdentityCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/CIFAS.identity.check.response');
const GeneratedProfileResponse = require('../../../../src/doc_scan_service/session/retrieve/generated.profile.response');
const GeneratedMedia = require('../../../../src/doc_scan_service/session/retrieve/generated.media');
const ReportResponse = require('../../../../src/doc_scan_service/session/retrieve/report.response');

describe('CIFASIdentityCheckResponse', () => {
  let CIFASIdentityCheck;
  beforeAll(() => {
    CIFASIdentityCheck = new CIFASIdentityCheckResponse({
      type: 'CIFAS_IDENTITY',
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      state: 'CREATED',
      created: '2021-06-11T11:39:24Z',
      last_updated: '2021-06-11T11:39:24Z',
      resources_used: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
      generated_media: [{}],
      generated_profile: { },
      report: {
        recommendation: { value: 'APPROVE' },
        breakdown: [],
      },
    });
  });

  describe('#getGeneratedProfile', () => {
    it('Should include generate_profile as generatedProfileResponse', () => {
      expect(CIFASIdentityCheck.getGeneratedProfile()).toBeInstanceOf(GeneratedProfileResponse);
    });
  });

  describe('#getType', () => {
    it('Should return the correct type', () => {
      expect(CIFASIdentityCheck.getType()).toBe('CIFAS_IDENTITY');
    });
  });

  describe('#getId', () => {
    it('Should return the correct id', () => {
      expect(CIFASIdentityCheck.getId()).toBe('3fa85f64-5717-4562-b3fc-2c963f66afa6');
    });
  });

  describe('#getState', () => {
    it('Should return the correct state', () => {
      expect(CIFASIdentityCheck.getState()).toBe('CREATED');
    });
  });

  describe('#getCreated', () => {
    it('should return created', () => {
      expect(CIFASIdentityCheck.getCreated().getMicrosecondTimestamp())
        .toBe('2021-06-11T11:39:24.000000Z');
    });
  });

  describe('#getLastUpdated', () => {
    it('should return last updated', () => {
      expect(CIFASIdentityCheck.getLastUpdated().getMicrosecondTimestamp())
        .toBe('2021-06-11T11:39:24.000000Z');
    });
  });

  describe('#getResourcesUsed', () => {
    it('should return list of resources', () => {
      const resources = CIFASIdentityCheck.getResourcesUsed();
      expect(resources.length).toBe(1);
      expect(resources[0]).toBe('3fa85f64-5717-4562-b3fc-2c963f66afa6');
    });
  });

  describe('#getGeneratedMedia', () => {
    it('should return list of generated media', () => {
      const media = CIFASIdentityCheck.getGeneratedMedia();
      expect(media.length).toBe(1);
      media.forEach((mediaItem) => {
        expect(mediaItem).toBeInstanceOf(GeneratedMedia);
      });
    });
  });

  describe('#getReport', () => {
    it('should return report', () => {
      const report = CIFASIdentityCheck.getReport();
      expect(report).toBeInstanceOf(ReportResponse);
    });
  });
});
