'use strict';

const RequestedCheck = require('./requested.check');
const DocScanConstants = require('../../../doc.scan.constants');
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
    super(DocScanConstants.ID_DOCUMENT_AUTHENTICITY, config);
  }
}

module.exports = RequestedDocumentAuthenticityCheck;
