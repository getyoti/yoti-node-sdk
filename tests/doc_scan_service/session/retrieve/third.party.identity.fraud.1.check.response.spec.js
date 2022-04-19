const ThirdPartyIdentityFraud1CheckResponse = require('../../../../src/doc_scan_service/session/retrieve/third.party.identity.fraud.1.check.response');
const GeneratedProfileResponse = require('../../../../src/doc_scan_service/session/retrieve/generated.profile.response');
const GeneratedMedia = require('../../../../src/doc_scan_service/session/retrieve/generated.media');
const ReportResponse = require('../../../../src/doc_scan_service/session/retrieve/report.response');

describe('ThirdPartyIdentityFraud1CheckResponse', () => {
  let thirdPartyIdentityFraud1Check;
  beforeAll(() => {
    thirdPartyIdentityFraud1Check = new ThirdPartyIdentityFraud1CheckResponse({
      type: 'THIRD_PARTY_IDENTITY_FRAUD_1',
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
      expect(thirdPartyIdentityFraud1Check.getGeneratedProfile())
        .toBeInstanceOf(GeneratedProfileResponse);
    });
  });

  describe('#getType', () => {
    it('Should return the correct type', () => {
      expect(thirdPartyIdentityFraud1Check.getType()).toBe('THIRD_PARTY_IDENTITY_FRAUD_1');
    });
  });

  describe('#getId', () => {
    it('Should return the correct id', () => {
      expect(thirdPartyIdentityFraud1Check.getId()).toBe('3fa85f64-5717-4562-b3fc-2c963f66afa6');
    });
  });

  describe('#getState', () => {
    it('Should return the correct state', () => {
      expect(thirdPartyIdentityFraud1Check.getState()).toBe('CREATED');
    });
  });

  describe('#getCreated', () => {
    it('should return created', () => {
      expect(thirdPartyIdentityFraud1Check.getCreated().getMicrosecondTimestamp())
        .toBe('2021-06-11T11:39:24.000000Z');
    });
  });

  describe('#getLastUpdated', () => {
    it('should return last updated', () => {
      expect(thirdPartyIdentityFraud1Check.getLastUpdated().getMicrosecondTimestamp())
        .toBe('2021-06-11T11:39:24.000000Z');
    });
  });

  describe('#getResourcesUsed', () => {
    it('should return list of resources', () => {
      const resources = thirdPartyIdentityFraud1Check.getResourcesUsed();
      expect(resources.length).toBe(1);
      expect(resources[0]).toBe('3fa85f64-5717-4562-b3fc-2c963f66afa6');
    });
  });

  describe('#getGeneratedMedia', () => {
    it('should return list of generated media', () => {
      const media = thirdPartyIdentityFraud1Check.getGeneratedMedia();
      expect(media.length).toBe(1);
      media.forEach((mediaItem) => {
        expect(mediaItem).toBeInstanceOf(GeneratedMedia);
      });
    });
  });

  describe('#getReport', () => {
    it('should return report', () => {
      const report = thirdPartyIdentityFraud1Check.getReport();
      expect(report).toBeInstanceOf(ReportResponse);
    });
  });
});
