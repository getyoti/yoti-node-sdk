'use strict';

const RequestedCheck = require('./requested.check');
const DocScanConstants = require('../../../doc.scan.constants');

/**
 * Requests creation of a DocumentAuthenticityCheck
 *
 * @class RequestedDocumentAuthenticityCheck
 */
class RequestedDocumentAuthenticityCheck extends RequestedCheck {
  constructor() {
    super(DocScanConstants.ID_DOCUMENT_AUTHENTICITY);
  }
}

module.exports = RequestedDocumentAuthenticityCheck;
