'use strict';

const RequestedCheck = require('./requested.check');
const RequestedFaceMatchCheckConfig = require('./requested.face.match.config');
const IDVConstants = require('../../../idv.constants');
const Validation = require('../../../../yoti_common/validation');

/**
 * Requests creation of a FaceMatchCheck
 *
 * @class RequestedFaceMatchCheck
 */
class RequestedFaceMatchCheck extends RequestedCheck {
  /**
   * @param {RequestedFaceMatchCheckConfig} config
   */
  constructor(config) {
    Validation.instanceOf(config, RequestedFaceMatchCheckConfig, 'config');
    super(IDVConstants.ID_DOCUMENT_FACE_MATCH, config);
  }
}

module.exports = RequestedFaceMatchCheck;
