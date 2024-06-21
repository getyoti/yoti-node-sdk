'use strict';

const Validation = require('../../../../../yoti_common/validation');
const MediaResponse = require('../../media.response');
const AdvancedIdentityProfileTrustFrameworkResponse = require('./advanced.identity.profile.trust.framework.response');

class AdvancedIdentityProfileReportResponse {
  constructor(report) {
    Validation.isArray(report.compliance, 'compliance');
    /** @private {AdvancedIdentityProfileTrustFrameworkResponse[]} */
    this.compliance = report.compliance
      .map((compliance) => new AdvancedIdentityProfileTrustFrameworkResponse(compliance));

    Validation.isPlainObject(report.media, 'media');
    /** @private {MediaResponse} */
    this.media = new MediaResponse(report.media);
  }

  /**
   * @returns {AdvancedIdentityProfileTrustFrameworkResponse[]}
   */
  getCompliance() {
    return this.compliance;
  }

  /**
   * @returns {MediaResponse}
   */
  getMedia() {
    return this.media;
  }
}

module.exports = AdvancedIdentityProfileReportResponse;
