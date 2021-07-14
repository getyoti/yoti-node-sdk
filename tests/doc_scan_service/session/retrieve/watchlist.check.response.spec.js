const WatchlistCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/watchlist.check.response');
const GeneratedMedia = require('../../../../src/doc_scan_service/session/retrieve/generated.media');
const GeneratedProfileResponse = require('../../../../src/doc_scan_service/session/retrieve/generated.profile.response');
const WatchlistReportResponse = require('../../../../src/doc_scan_service/session/retrieve/watchlist.report.response');

describe('WatchlistCheckResponse', () => {
  let watchListCheckResponse;

  beforeEach(() => {
    watchListCheckResponse = new WatchlistCheckResponse({
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
      expect(watchListCheckResponse.getType()).toBe('some-type');
    });
  });

  describe('#getId', () => {
    it('should return ID', () => {
      expect(watchListCheckResponse.getId()).toBe('some-id');
    });
  });

  describe('#getState', () => {
    it('should return state', () => {
      expect(watchListCheckResponse.getState()).toBe('some-state');
    });
  });

  describe('#getCreated', () => {
    it('should return created', () => {
      expect(watchListCheckResponse.getCreated().getMicrosecondTimestamp())
        .toBe('2006-01-02T22:04:05.123000Z');
    });
  });

  describe('#getLastUpdated', () => {
    it('should return last updated', () => {
      expect(watchListCheckResponse.getLastUpdated().getMicrosecondTimestamp())
        .toBe('2006-02-02T22:04:05.123000Z');
    });
  });

  describe('#getResourcesUsed', () => {
    describe('when resources used are available', () => {
      it('should return list of resources', () => {
        const resources = watchListCheckResponse.getResourcesUsed();
        expect(resources.length).toBe(2);
        expect(resources[0]).toBe('some-resource');
        expect(resources[1]).toBe('some-other-resource');
      });
    });
    describe('when resources used are not available', () => {
      it('should return empty array', () => {
        watchListCheckResponse = new WatchlistCheckResponse({});
        const resources = watchListCheckResponse.getResourcesUsed();
        expect(resources).toBeInstanceOf(Array);
        expect(resources.length).toBe(0);
      });
    });
  });

  describe('#getGeneratedMedia', () => {
    describe('when generated media is available', () => {
      it('should return list of generated media', () => {
        const media = watchListCheckResponse.getGeneratedMedia();
        expect(media.length).toBe(2);
        media.forEach((mediaItem) => {
          expect(mediaItem).toBeInstanceOf(GeneratedMedia);
        });
      });
    });
    describe('when generated media is not available', () => {
      it('should return empty array', () => {
        watchListCheckResponse = new WatchlistCheckResponse({});
        const media = watchListCheckResponse.getGeneratedMedia();
        expect(media).toBeInstanceOf(Array);
        expect(media.length).toBe(0);
      });
    });
  });

  describe('#getReport', () => {
    it('should return report as instance of WatchlistReportResponse', () => {
      const report = watchListCheckResponse.getReport();
      expect(report).toBeInstanceOf(WatchlistReportResponse);
    });
  });

  describe('#getGeneratedProfile', () => {
    it('should return generatedProfile', () => {
      const generatedProfile = watchListCheckResponse.getGeneratedProfile();
      expect(generatedProfile).toBeInstanceOf(GeneratedProfileResponse);
    });
  });
});
