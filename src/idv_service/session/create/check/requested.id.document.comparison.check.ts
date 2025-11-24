import RequestedCheck = require('./requested.check');
import IDVConstants = require('../../../idv.constants');
import Validation = require('../../../../yoti_common/validation');
import RequestedIdDocumentComparisonConfig = require('./requested.id.document.comparison.config');

/**
 * @class RequestedIdDocumentComparisonCheck
 */
class RequestedIdDocumentComparisonCheck extends RequestedCheck {
  /**
   * @param {RequestedIdDocumentComparisonConfig} config
   */
  constructor(config) {
    Validation.instanceOf(config, RequestedIdDocumentComparisonConfig, 'config');
    super(IDVConstants.ID_DOCUMENT_COMPARISON, config);
  }
}

export default RequestedIdDocumentComparisonCheck;
