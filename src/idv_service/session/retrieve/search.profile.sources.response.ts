import Validation = require('../../../yoti_common/validation');
import CaSourcesResponse = require('./ca.sources.response');

class SearchProfileSourcesResponse extends CaSourcesResponse {
  constructor(sources) {
    super(sources);

    Validation.isString(sources.type, 'search_profile');
    /** @private */
    this.searchProfile = sources.search_profile;
  }

  /**
   *
   * @return {string}
   */
  getSearchProfile() {
    return this.searchProfile;
  }
}

export default SearchProfileSourcesResponse;
