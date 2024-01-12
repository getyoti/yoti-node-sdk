'use strict';

const RequestedLivenessConfig = require('./requested.liveness.config');
const RequestedLivenessCheck = require('./requested.liveness.check');
const IDVConstants = require('../../../idv.constants');
const Validation = require('../../../../yoti_common/validation');

/**
 * Builder to assist the creation of {@link RequestedLivenessCheck}.
 */
class RequestedLivenessCheckBuilder {
  constructor() {
    /** @private */
    this.maxRetries = 1;
  }

  /**
   * Sets the type to be of a ZOOM liveness check
   *
   * @returns {this}
   */
  forZoomLiveness() {
    return this.forLivenessType(IDVConstants.ZOOM);
  }

  /**
   * Sets the type to be of a Static liveness check
   *
   * @returns {this}
   */
  forStaticLiveness() {
    return this.forLivenessType(IDVConstants.STATIC);
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
   * @param {number} maxRetries
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
