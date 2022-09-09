'use strict';

const RequestedCheck = require('./requested.check');
const IDVConstants = require('../../../idv.constants');
const Validation = require('../../../../yoti_common/validation');
const RequestedDocumentAuthenticityConfig = require('./requested.document.authenticity.config');

/**
 * Requests creation of a DocumentAuthenticityCheck
 *
 * @class RequestedDocumentAuthenticityCheck
 */
class RequestedDocumentAuthenticityCheck extends RequestedCheck {
  /**
   * @param {RequestedDocumentAuthenticityConfig} config
   */
  constructor(config) {
    Validation.instanceOf(config, RequestedDocumentAuthenticityConfig, 'config');
    super(IDVConstants.ID_DOCUMENT_AUTHENTICITY, config);
  }
}

module.exports = RequestedDocumentAuthenticityCheck;
