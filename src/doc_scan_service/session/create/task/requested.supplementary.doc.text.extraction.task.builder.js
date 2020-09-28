'use strict';

const DocScanConstants = require('../../../doc.scan.constants');
const Validation = require('../../../../yoti_common/validation');
const RequestedSupplementaryDocTextExtractionTask = require('./requested.supplementary.doc.text.extraction.task');
const RequestedSupplementaryDocTextExtractionConfig = require('./requested.supplementary.doc.text.extraction.config');

/**
 * Builder to assist creation of {@link RequestedSupplementaryDocTextExtractionTask}.
 *
 * @class RequestedSupplementaryDocTextExtractionTaskBuilder
 */
class RequestedSupplementaryDocTextExtractionTaskBuilder {
  /**
   * Requires that the Task is always followed by a manual TextDataCheck
   *
   * @returns {this}
   */
  withManualCheckAlways() {
    this.manualCheck = DocScanConstants.ALWAYS;
    return this;
  }

  /**
   * Requires that only failed Tasks are followed by a manual TextDataCheck
   *
   * @returns {this}
   */
  withManualCheckFallback() {
    this.manualCheck = DocScanConstants.FALLBACK;
    return this;
  }

  /**
   * The SupplementaryTextExtractionTask will never fallback to a manual TextDataCheck
   *
   * @returns {this}
   */
  withManualCheckNever() {
    this.manualCheck = DocScanConstants.NEVER;
    return this;
  }

  /**
   * Builds a {@link RequestedSupplementaryDocTextExtractionTask} using the values
   * supplied to the builder
   *
   * @returns {RequestedSupplementaryDocTextExtractionTask}
   */
  build() {
    Validation.notNullOrEmpty(this.manualCheck, 'manualCheck');

    const config = new RequestedSupplementaryDocTextExtractionConfig(this.manualCheck);
    return new RequestedSupplementaryDocTextExtractionTask(config);
  }
}

module.exports = RequestedSupplementaryDocTextExtractionTaskBuilder;
