'use strict';

const { PROFILE } = require('../../../doc.scan.constants');
const Validation = require('../../../../yoti_common/validation');
const RequestedCaSources = require('./requested.ca.sources');

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

module.exports = RequestedSearchProfileSources;
