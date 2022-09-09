'use strict';

const RequestedTask = require('./requested.task');
const IDVConstants = require('../../../idv.constants');
const Validation = require('../../../../yoti_common/validation');
const RequestedSupplementaryTextExtractionConfig = require('./requested.supplementary.doc.text.extraction.config');

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

module.exports = RequestedSupplementaryDocTextExtractionTask;
