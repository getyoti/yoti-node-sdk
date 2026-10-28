const WatchlistSearchConfigResponse = require('../../../../src/idv_service/session/retrieve/watchlist.search.config.response');
const WatchlistAdvancedCaSearchConfigResponse = require('../../../../src/idv_service/session/retrieve/watchlist.advanced.ca.search.config.response');

describe('WatchlistAdvancedCaSearchConfigResponse', () => {
  it('is a class that extends WatchlistSearchConfigResponse', () => {
    expect(WatchlistAdvancedCaSearchConfigResponse.prototype).toBeInstanceOf(WatchlistSearchConfigResponse);
  });
  describe('is an abstract class', () => {
    it('should not be instantiable', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new WatchlistAdvancedCaSearchConfigResponse();
      }).toThrow('WatchlistAdvancedCaSearchConfigResponse can not be instantiated');
    });
  });
});
