import RequestedCheck = require('./requested.check');
import IDVConstants = require('../../../idv.constants');
import Validation = require('../../../../yoti_common/validation');
import RequestedDocumentAuthenticityConfig = require('./requested.document.authenticity.config');

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

export default RequestedDocumentAuthenticityCheck;
