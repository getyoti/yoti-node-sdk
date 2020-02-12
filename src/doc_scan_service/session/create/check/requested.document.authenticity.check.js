'use strict';

const RequestedCheck = require('./requested.check');
const DocScanConstants = require('../../../doc.scan.constants');

/**
 * Represents a requested document authenticity check.
 *
 * @class RequestedDocumentAuthenticityCheck
 */
class RequestedDocumentAuthenticityCheck extends RequestedCheck {
  constructor() {
    super(DocScanConstants.ID_DOCUMENT_AUTHENTICITY);
  }
}

module.exports = RequestedDocumentAuthenticityCheck;
