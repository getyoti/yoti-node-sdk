import { PROFILE } from '../../../idv.constants';
import Validation = require('../../../../yoti_common/validation');
import RequestedCaSources = require('./requested.ca.sources');

/**
 *
 * @class RequestedSearchProfileSources
 */
class RequestedSearchProfileSources extends RequestedCaSources {
  /**
   * @param searchProfile {string}
   *
   */
  constructor(searchProfile) {
    super(PROFILE);
    Validation.notNullOrEmpty(searchProfile, 'searchProfile');
    Validation.isString(searchProfile, 'searchProfile');
    /** @private */
    this.searchProfile = searchProfile;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      type: this.type,
      search_profile: this.searchProfile,
    };
  }
}

export default RequestedSearchProfileSources;
