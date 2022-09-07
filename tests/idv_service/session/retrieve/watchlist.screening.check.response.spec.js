const GeneratedMedia = require('../../../../src/idv_service/session/retrieve/generated.media');
const GeneratedProfileResponse = require('../../../../src/idv_service/session/retrieve/generated.profile.response');
const WatchlistScreeningReportResponse = require('../../../../src/idv_service/session/retrieve/watchlist.screening.report.response');
const WatchlistCheckResponse = require('../../../../src/idv_service/session/retrieve/watchlist.check.response');
const WatchlistScreeningCheckResponse = require('../../../../src/idv_service/session/retrieve/watchlist.screening.check.response');

describe('WatchlistScreeningCheckResponse', () => {
  it('is a class that extends WatchlistCheckResponse', () => {
    expect(WatchlistScreeningCheckResponse.prototype).toBeInstanceOf(WatchlistCheckResponse);
  });

  describe('given an instance of the class', () => {
    let watchListScreeningCheckResponse;

    beforeEach(() => {
      watchListScreeningCheckResponse = new WatchlistScreeningCheckResponse({
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
        expect(watchListScreeningCheckResponse.getType()).toBe('some-type');
      });
    });

    describe('#getId', () => {
      it('should return ID', () => {
        expect(watchListScreeningCheckResponse.getId()).toBe('some-id');
      });
    });

    describe('#getState', () => {
      it('should return state', () => {
        expect(watchListScreeningCheckResponse.getState()).toBe('some-state');
      });
    });

    describe('#getCreated', () => {
      it('should return created', () => {
        expect(watchListScreeningCheckResponse.getCreated().getMicrosecondTimestamp())
          .toBe('2006-01-02T22:04:05.123000Z');
      });
    });

    describe('#getLastUpdated', () => {
      it('should return last updated', () => {
        expect(watchListScreeningCheckResponse.getLastUpdated().getMicrosecondTimestamp())
          .toBe('2006-02-02T22:04:05.123000Z');
      });
    });

    describe('#getResourcesUsed', () => {
      describe('when resources used are available', () => {
        it('should return list of resources', () => {
          const resources = watchListScreeningCheckResponse.getResourcesUsed();
          expect(resources.length).toBe(2);
          expect(resources[0]).toBe('some-resource');
          expect(resources[1]).toBe('some-other-resource');
        });
      });
      describe('when resources used are not available', () => {
        it('should return empty array', () => {
          watchListScreeningCheckResponse = new WatchlistScreeningCheckResponse({});
          const resources = watchListScreeningCheckResponse.getResourcesUsed();
          expect(resources).toBeInstanceOf(Array);
          expect(resources.length).toBe(0);
        });
      });
    });

    describe('#getGeneratedMedia', () => {
      describe('when generated media is available', () => {
        it('should return list of generated media', () => {
          const media = watchListScreeningCheckResponse.getGeneratedMedia();
          expect(media.length).toBe(2);
          media.forEach((mediaItem) => {
            expect(mediaItem).toBeInstanceOf(GeneratedMedia);
          });
        });
      });
      describe('when generated media is not available', () => {
        it('should return empty array', () => {
          watchListScreeningCheckResponse = new WatchlistScreeningCheckResponse({});
          const media = watchListScreeningCheckResponse.getGeneratedMedia();
          expect(media).toBeInstanceOf(Array);
          expect(media.length).toBe(0);
        });
      });
    });

    describe('#getReport', () => {
      it('should return report as instance of WatchlistScreeningReportResponse', () => {
        const report = watchListScreeningCheckResponse.getReport();
        expect(report).toBeInstanceOf(WatchlistScreeningReportResponse);
      });
    });

    describe('#getGeneratedProfile', () => {
      it('should return generatedProfile', () => {
        const generatedProfile = watchListScreeningCheckResponse.getGeneratedProfile();
        expect(generatedProfile).toBeInstanceOf(GeneratedProfileResponse);
      });
    });
  });
});
