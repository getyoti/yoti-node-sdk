import Validation = require('../../../../yoti_common/validation');
import RequestedSearchProfileSources = require('./requested.search.profile.sources');

/**
 * Builder to assist the creation of {@link RequestedSearchProfileSources}.
 *
 * @class RequestedSearchProfileSourcesBuilder
 */
class RequestedSearchProfileSourcesBuilder {
  /**
   * Sets searchProfile used for sources
   *
   * @param searchProfile {string}
   *
   * @returns {this}
   */
  withSearchProfile(searchProfile) {
    Validation.notNullOrEmpty(searchProfile, 'searchProfile');
    Validation.isString(searchProfile, 'searchProfile');
    this.searchProfile = searchProfile;
    return this;
  }

  /**
   *
   * @return {RequestedSearchProfileSources}
   */
  build() {
    return new RequestedSearchProfileSources(this.searchProfile);
  }
}

export default RequestedSearchProfileSourcesBuilder;
