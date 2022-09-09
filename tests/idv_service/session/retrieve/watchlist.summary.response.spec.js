const WatchlistSummaryResponse = require('../../../../src/idv_service/session/retrieve/watchlist.summary.response');

describe('WatchlistSummaryResponse', () => {
  describe('is an abstract class', () => {
    it('should not be instantiable', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new WatchlistSummaryResponse();
      }).toThrow('WatchlistSummaryResponse can not be instantiated');
    });
  });
});
