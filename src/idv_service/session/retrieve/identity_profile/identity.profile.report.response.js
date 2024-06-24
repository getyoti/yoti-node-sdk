'use strict';

const IdentityProfileReportSchemesComplianceResponse = require('./identity.profile.report.schemes.compliance.response');
const Validation = require('../../../../yoti_common/validation');
const MediaResponse = require('../media.response');

class IdentityProfileReportResponse {
  constructor(report) {
    Validation.isString(report.trust_framework, 'trust_framework');
    /** @private {string} */
    this.trustFramework = report.trust_framework;

    Validation.isArray(report.schemes_compliance, 'schemes_compliance');
    /** @private {IdentityProfileReportSchemesComplianceResponse[]} */
    this.schemesCompliance = report.schemes_compliance
      // eslint-disable-next-line max-len
      .map((schemeCompliance) => new IdentityProfileReportSchemesComplianceResponse(schemeCompliance));

    Validation.isPlainObject(report.media, 'media');
    /** @private {MediaResponse} */
    this.media = new MediaResponse(report.media);
  }

  /**
   * @returns {string}
   */
  getTrustFramework() {
    return this.trustFramework;
  }

  /**
   * @returns {IdentityProfileReportSchemesComplianceResponse[]}
   */
  getSchemesCompliance() {
    return this.schemesCompliance;
  }

  /**
   * @returns {MediaResponse}
   */
  getMedia() {
    return this.media;
  }
}

module.exports = IdentityProfileReportResponse;
