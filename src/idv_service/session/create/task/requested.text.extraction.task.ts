import RequestedTask = require('./requested.task');
import RequestedTextExtractionConfig = require('./requested.text.extraction.config');
import IDVConstants = require('../../../idv.constants');
import Validation = require('../../../../yoti_common/validation');

/**
 * Requests that a TextExtractionTask be applied to each Document
 *
 * @class RequestedTextExtractionTask
 */
class RequestedTextExtractionTask extends RequestedTask {
  /**
   * @param {RequestedTextExtractionConfig} config
   */
  constructor(config) {
    Validation.instanceOf(config, RequestedTextExtractionConfig, 'config');
    super(IDVConstants.ID_DOCUMENT_TEXT_DATA_EXTRACTION, config);
  }
}

export default RequestedTextExtractionTask;
