const WatchlistCheckResponse = require('../../../../src/idv_service/session/retrieve/watchlist.check.response');
const ProfileCheckResponse = require('../../../../src/idv_service/session/retrieve/profile.check.response');

describe('WatchlistCheckResponse', () => {
  it('is class that extends ReportResponse', () => {
    expect(WatchlistCheckResponse.prototype).toBeInstanceOf(ProfileCheckResponse);
  });

  describe('is an abstract class', () => {
    it('should not be instantiable', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new WatchlistCheckResponse();
      }).toThrow('WatchlistCheckResponse can not be instantiated');
    });
  });
});
