'use strict';

const RequestedFaceComparisonConfig = require('./requested.face.comparison.config');
const RequestedFaceComparisonCheck = require('./requested.face.comparison.check');
const IDVConstants = require('../../../idv.constants');
const Validation = require('../../../../yoti_common/validation');

/**
 * Builder to assist creation of {@link RequestedFaceComparisonCheck}.
 *
 * @class RequestedFaceComparisonCheckBuilder
 */
class RequestedFaceComparisonCheckBuilder {
  /**
   * Requires that only an automated Check is performed.  No manual follow-up
   * Check will ever be initiated
   *
   * @returns {this}
   */
  withManualCheckNever() {
    this.manualCheck = IDVConstants.NEVER;
    return this;
  }

  /**
   * Build a {@link RequestedFaceComparisonCheck} using the values supplied to the builder
   *
   * @returns {RequestedFaceComparisonCheck}
   */
  build() {
    Validation.notNullOrEmpty(this.manualCheck, 'manualCheck');

    const config = new RequestedFaceComparisonConfig(this.manualCheck);
    return new RequestedFaceComparisonCheck(config);
  }
}

module.exports = RequestedFaceComparisonCheckBuilder;
