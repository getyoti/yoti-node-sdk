'use strict';

const RequestedFaceMatchConfig = require('./requested.face.match.config');
const RequestedFaceMatchCheck = require('./requested.face.match.check');
const DocScanConstants = require('../../../doc.scan.constants');
const Validation = require('../../../../yoti_common/validation');

/**
 * Builder to assist creation of {@link RequestedFaceMatchCheck}.
 *
 * @class RequestedFaceMatchCheckBuilder
 */
class RequestedFaceMatchCheckBuilder {
  /**
   * Requires that a manual follow-up check is always performed
   *
   * @returns {this}
   */
  withManualCheckAlways() {
    this.manualCheck = DocScanConstants.ALWAYS;
    return this;
  }

  /**
   * Requires that a manual follow-up check is performed only on failed Checks,
   * and those with a low level of confidence
   *
   * @returns {this}
   */
  withManualCheckFallback() {
    this.manualCheck = DocScanConstants.FALLBACK;
    return this;
  }

  /**
   * Requires that only an automated Check is performed.  No manual follow-up
   * Check will ever be initiated
   *
   * @returns {this}
   */
  withManualCheckNever() {
    this.manualCheck = DocScanConstants.NEVER;
    return this;
  }

  /**
   * Build a {@link RequestedFaceMatchCheck} using the values supplied to the builder
   *
   * @returns {RequestedFaceMatchCheck}
   */
  build() {
    Validation.notNullOrEmpty(this.manualCheck, 'manualCheck');

    const config = new RequestedFaceMatchConfig(this.manualCheck);
    return new RequestedFaceMatchCheck(config);
  }
}

module.exports = RequestedFaceMatchCheckBuilder;
