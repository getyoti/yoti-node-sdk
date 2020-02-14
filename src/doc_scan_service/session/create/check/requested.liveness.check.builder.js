'use strict';

const RequestedLivenessConfig = require('./requested.liveness.config');
const RequestedLivenessCheck = require('./requested.liveness.check');
const DocScanConstants = require('../../../doc.scan.constants');
const Validation = require('../../../../yoti_common/validation');

/**
 * Builder to assist the creation of {@link RequestedLivenessCheck}.
 */
class RequestedLivenessCheckBuilder {
  constructor() {
    this.maxRetries = 1;
  }

  /**
   * Sets the type to be of a ZOOM liveness check
   *
   * @returns {this}
   */
  forZoomLiveness() {
    return this.forLivenessType(DocScanConstants.ZOOM);
  }

  /**
   * Sets the type of the liveness check to the supplied value
   *
   * @param {string} livenessType
   *   The type of the liveness check
   *
   * @returns {this}
   */
  forLivenessType(livenessType) {
    Validation.isString(livenessType, 'livenessType');
    this.livenessType = livenessType;
    return this;
  }

  /**
   * Sets the maximum number of retries allowed by the user
   *
   * @param {int} maxRetries
   *   The maximum number of retries
   *
   * @returns {this}
   */
  withMaxRetries(maxRetries) {
    Validation.isInteger(maxRetries, 'maxRetries');
    this.maxRetries = maxRetries;
    return this;
  }

  /**
   * Builds a {@link RequestedLivenessCheck} using the values supplied to the builder
   *
   * @returns {RequestedLivenessCheck}
   */
  build() {
    Validation.notNullOrEmpty(this.livenessType, 'livenessType');

    const config = new RequestedLivenessConfig(this.maxRetries, this.livenessType);
    return new RequestedLivenessCheck(config);
  }
}

module.exports = RequestedLivenessCheckBuilder;
