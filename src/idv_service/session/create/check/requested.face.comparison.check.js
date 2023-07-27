'use strict';

const RequestedCheck = require('./requested.check');
const RequestedFaceComparisonCheckConfig = require('./requested.face.comparison.config');
const IDVConstants = require('../../../idv.constants');
const Validation = require('../../../../yoti_common/validation');

/**
 * Requests creation of a FaceComparisonCheck
 *
 * @class RequestedFaceComparisonCheck
 */
class RequestedFaceComparisonCheck extends RequestedCheck {
  /**
   * @param {RequestedFaceComparisonCheckConfig} config
   */
  constructor(config) {
    Validation.instanceOf(config, RequestedFaceComparisonCheckConfig, 'config');
    super(IDVConstants.FACE_COMPARISON, config);
  }
}

module.exports = RequestedFaceComparisonCheck;
