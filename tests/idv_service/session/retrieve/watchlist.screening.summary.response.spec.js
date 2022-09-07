const RawResultsResponse = require('../../../../src/idv_service/session/retrieve/raw.results.response');
const WatchlistScreeningSearchConfigResponse = require('../../../../src/idv_service/session/retrieve/watchlist.screening.search.config.response');
const WatchlistSummaryResponse = require('../../../../src/idv_service/session/retrieve/watchlist.summary.response');
const WatchlistScreeningSummaryResponse = require('../../../../src/idv_service/session/retrieve/watchlist.screening.summary.response');

describe('WatchlistScreeningSummaryResponse', () => {
  it('is a class that extends WatchlistSummaryResponse', () => {
    expect(WatchlistScreeningSummaryResponse.prototype).toBeInstanceOf(WatchlistSummaryResponse);
  });

  describe('given an instance of the class', () => {
    let watchlistScreeningSummaryResponse;

    beforeEach(() => {
      watchlistScreeningSummaryResponse = new WatchlistScreeningSummaryResponse({
        total_hits: 9,
        associated_country_codes: ['USA', 'GBR'],
        search_config: {
          categories: ['one', 'two'],
        },
        raw_results: {
          media: {},
        },
      });
    });

    describe('#getTotalHits', () => {
      it('should return the total hits', () => {
        expect(watchlistScreeningSummaryResponse.getTotalHits()).toBe(9);
      });
    });

    describe('#getAssociatedCountryCodes', () => {
      it('should return the list of associated country codes', () => {
        expect(watchlistScreeningSummaryResponse.getAssociatedCountryCodes()).toEqual(['USA', 'GBR']);
      });
    });

    describe('#getRawResults', () => {
      it('should return the raw results response', () => {
        // eslint-disable-next-line max-len
        expect(watchlistScreeningSummaryResponse.getRawResults()).toBeInstanceOf(RawResultsResponse);
      });
    });

    describe('#getSearchConfig', () => {
      it('should return the search config response', () => {
        expect(watchlistScreeningSummaryResponse.getSearchConfig())
          .toBeInstanceOf(WatchlistScreeningSearchConfigResponse);
        const searchConfig = watchlistScreeningSummaryResponse.getSearchConfig();
        expect(searchConfig.getCategories()).toStrictEqual(['one', 'two']);
      });
    });
  });
});
