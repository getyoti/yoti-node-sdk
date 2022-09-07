const WatchlistSearchConfigResponse = require('../../../../src/idv_service/session/retrieve/watchlist.search.config.response');

describe('WatchlistSearchConfigResponse', () => {
  describe('is an abstract class', () => {
    it('should not be instantiable', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new WatchlistSearchConfigResponse();
      }).toThrow('WatchlistSearchConfigResponse can not be instantiated');
    });
  });
});
