'use strict';

const Validation = require('../../../yoti_common/validation');
const CaSourcesResponse = require('./ca.sources.response');

class SearchProfileSourcesResponse extends CaSourcesResponse {
  constructor(sources) {
    super(sources);

    Validation.isString(sources.type, 'search_profile');
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

module.exports = SearchProfileSourcesResponse;
