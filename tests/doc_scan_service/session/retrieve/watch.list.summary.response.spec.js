const WatchlistSummaryResponse = require('../../../../src/doc_scan_service/session/retrieve/watch.list.summary.response');
const RawResultsResponse = require('../../../../src/doc_scan_service/session/retrieve/raw.results.response');
const SearchConfigResponse = require('../../../../src/doc_scan_service/session/retrieve/search.config.response');

describe('WatchlistSummaryResponse', () => {
  let watchListSummaryResponse;

  beforeEach(() => {
    watchListSummaryResponse = new WatchlistSummaryResponse({
      total_hits: 9,
      associated_country_codes: ['USA', 'GBR'],
      search_config: {},
      raw_results: {
        media: {},
      },
    });
  });

  describe('#getTotalHits', () => {
    it('should return the total hits', () => {
      expect(watchListSummaryResponse.getTotalHits()).toBe(9);
    });
  });

  describe('#getAssociatedCountryCodes', () => {
    it('should return the list of associated country codes', () => {
      expect(watchListSummaryResponse.getAssociatedCountryCodes()).toEqual(['USA', 'GBR']);
    });
  });

  describe('#getRawResults', () => {
    it('should return the raw results response', () => {
      expect(watchListSummaryResponse.getRawResults()).toBeInstanceOf(RawResultsResponse);
    });
  });

  describe('#getSearchConfig', () => {
    it('should return the search config response', () => {
      expect(watchListSummaryResponse.getSearchConfig()).toBeInstanceOf(SearchConfigResponse);
    });
  });
});
