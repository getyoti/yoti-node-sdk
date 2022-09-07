const ProfileCheckResponse = require('../../../../src/idv_service/session/retrieve/profile.check.response');
const GeneratedMedia = require('../../../../src/idv_service/session/retrieve/generated.media');
const GeneratedProfileResponse = require('../../../../src/idv_service/session/retrieve/generated.profile.response');
const ReportResponse = require('../../../../src/idv_service/session/retrieve/report.response');

describe('ProfileCheckResponse', () => {
  let profileCheckResponse;

  beforeEach(() => {
    profileCheckResponse = new ProfileCheckResponse({
      type: 'some-type',
      id: 'some-id',
      state: 'some-state',
      created: '2006-01-02T22:04:05.123Z',
      last_updated: '2006-02-02T22:04:05.123Z',
      resources_used: [
        'some-resource',
        'some-other-resource',
      ],
      generated_media: [
        {},
        {},
      ],
      report: {},
      generated_profile: {},
    });
  });

  describe('#getType', () => {
    it('should return type', () => {
      expect(profileCheckResponse.getType()).toBe('some-type');
    });
  });

  describe('#getId', () => {
    it('should return ID', () => {
      expect(profileCheckResponse.getId()).toBe('some-id');
    });
  });

  describe('#getState', () => {
    it('should return state', () => {
      expect(profileCheckResponse.getState()).toBe('some-state');
    });
  });

  describe('#getCreated', () => {
    it('should return created', () => {
      expect(profileCheckResponse.getCreated().getMicrosecondTimestamp())
        .toBe('2006-01-02T22:04:05.123000Z');
    });
  });

  describe('#getLastUpdated', () => {
    it('should return last updated', () => {
      expect(profileCheckResponse.getLastUpdated().getMicrosecondTimestamp())
        .toBe('2006-02-02T22:04:05.123000Z');
    });
  });

  describe('#getResourcesUsed', () => {
    describe('when resources used are available', () => {
      it('should return list of resources', () => {
        const resources = profileCheckResponse.getResourcesUsed();
        expect(resources.length).toBe(2);
        expect(resources[0]).toBe('some-resource');
        expect(resources[1]).toBe('some-other-resource');
      });
    });
    describe('when resources used are not available', () => {
      it('should return empty array', () => {
        profileCheckResponse = new ProfileCheckResponse({});
        const resources = profileCheckResponse.getResourcesUsed();
        expect(resources).toBeInstanceOf(Array);
        expect(resources.length).toBe(0);
      });
    });
  });

  describe('#getGeneratedMedia', () => {
    describe('when generated media is available', () => {
      it('should return list of generated media', () => {
        const media = profileCheckResponse.getGeneratedMedia();
        expect(media.length).toBe(2);
        media.forEach((mediaItem) => {
          expect(mediaItem).toBeInstanceOf(GeneratedMedia);
        });
      });
    });
    describe('when generated media is not available', () => {
      it('should return empty array', () => {
        profileCheckResponse = new ProfileCheckResponse({});
        const media = profileCheckResponse.getGeneratedMedia();
        expect(media).toBeInstanceOf(Array);
        expect(media.length).toBe(0);
      });
    });
  });

  describe('#getReport', () => {
    it('should return report', () => {
      const report = profileCheckResponse.getReport();
      expect(report).toBeInstanceOf(ReportResponse);
    });
  });

  describe('#getGeneratedProfile', () => {
    it('should return generatedProfile', () => {
      const generatedProfile = profileCheckResponse.getGeneratedProfile();
      expect(generatedProfile).toBeInstanceOf(GeneratedProfileResponse);
    });
  });
});
