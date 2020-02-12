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
   * Sets the check to always trigger a manual check for the face match
   *
   * @returns {this}
   */
  withManualCheckAlways() {
    this.manualCheck = DocScanConstants.ALWAYS;
    return this;
  }

  /**
   * Sets the check to fallback to a manual check for the face match if automated
   * checks are rejected/fail
   *
   * @returns {this}
   */
  withManualCheckFallback() {
    this.manualCheck = DocScanConstants.FALLBACK;
    return this;
  }

  /**
   * Sets the check to never fallback to a manual check for the face match
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
