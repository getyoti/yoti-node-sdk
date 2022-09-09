const ProfileCheckResponse = require('./profile.check.response');

class WatchlistCheckResponse extends ProfileCheckResponse {
  constructor(check) {
    const currentClass = new.target;
    if (currentClass === WatchlistCheckResponse) {
      throw new Error('WatchlistCheckResponse can not be instantiated');
    }
    super(check);
  }
}

module.exports = WatchlistCheckResponse;
