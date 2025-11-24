import RequestedTask = require('./requested.task');
import IDVConstants = require('../../../idv.constants');
import Validation = require('../../../../yoti_common/validation');
import RequestedSupplementaryTextExtractionConfig = require('./requested.supplementary.doc.text.extraction.config');

/**
 * Requests that a SupplementaryTextExtractionTask be applied to each Document
 *
 * @class RequestedSupplementaryDocTextExtractionTask
 */
class RequestedSupplementaryDocTextExtractionTask extends RequestedTask {
  /**
   * @param {RequestedSupplementaryTextExtractionConfig} config
   */
  constructor(config) {
    Validation.instanceOf(config, RequestedSupplementaryTextExtractionConfig, 'config');
    super(IDVConstants.SUPPLEMENTARY_DOCUMENT_TEXT_DATA_EXTRACTION, config);
  }
}

export default RequestedSupplementaryDocTextExtractionTask;
