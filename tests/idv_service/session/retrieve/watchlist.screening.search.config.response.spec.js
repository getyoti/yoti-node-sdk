const WatchlistScreeningSearchConfigResponse = require('../../../../src/idv_service/session/retrieve/watchlist.screening.search.config.response');

describe('WatchlistScreeningSearchConfigResponse', () => {
  let searchConfigResponse;

  beforeEach(() => {
    searchConfigResponse = new WatchlistScreeningSearchConfigResponse({
      categories: ['NEWS', 'SPORTS', 'HISTORY'],
    });
  });

  describe('#getCategories', () => {
    it('should return categories', () => {
      expect(searchConfigResponse.getCategories()).toEqual(['NEWS', 'SPORTS', 'HISTORY']);
    });
  });

  describe('#constructor', () => {
    it('should set up empty categories if none present', () => {
      searchConfigResponse = new WatchlistScreeningSearchConfigResponse({});
      expect(searchConfigResponse.getCategories()).toEqual([]);
    });
  });
});
