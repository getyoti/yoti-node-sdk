'use strict';

const RequestedTask = require('./requested.task');
const RequestedTextExtractionConfig = require('./requested.text.extraction.config');
const DocScanConstants = require('../../../doc.scan.constants');
const Validation = require('../../../../yoti_common/validation');

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
    super(DocScanConstants.ID_DOCUMENT_TEXT_DATA_EXTRACTION, config);
  }
}

module.exports = RequestedTextExtractionTask;
