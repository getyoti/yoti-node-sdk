'use strict';

const Validation = require('../../../../../yoti_common/validation');
const MediaResponse = require('../../media.response');
const AdvancedIdentityProfileTrustFrameworkComplianceResponse = require('./advanced.identity.profile.trust.framework.compliance.response');

class AdvancedIdentityProfileReportResponse {
  constructor(report) {
    Validation.isArray(report.compliance, 'compliance');
    /** @private {AdvancedIdentityProfileTrustFrameworkComplianceResponse[]} */
    this.compliance = report.compliance
      .map((compliance) => new AdvancedIdentityProfileTrustFrameworkComplianceResponse(compliance));

    Validation.isPlainObject(report.media, 'media');
    /** @private {MediaResponse} */
    this.media = new MediaResponse(report.media);
  }

  getCompliance() {
    return this.compliance;
  }

  getMedia() {
    return this.media;
  }
}

module.exports = AdvancedIdentityProfileReportResponse;
