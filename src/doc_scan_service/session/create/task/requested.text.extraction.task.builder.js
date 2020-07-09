'use strict';

const RequestedTextExtractionConfig = require('./requested.text.extraction.config');
const RequestedTextExtractionTask = require('./requested.text.extraction.task');
const DocScanConstants = require('../../../doc.scan.constants');
const Validation = require('../../../../yoti_common/validation');

/**
 * Builder to assist creation of {@link RequestedTextExtractionTask}.
 *
 * @class RequestedTextExtractionTaskBuilder
 */
class RequestedTextExtractionTaskBuilder {
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
   * The TextExtractionTask will never fallback to a manual TextDataCheck
   *
   * @returns {this}
   */
  withManualCheckNever() {
    this.manualCheck = DocScanConstants.NEVER;
    return this;
  }

  /**
   * @returns {this}
   */
  withChipDataDesired() {
    this.chipData = DocScanConstants.DESIRED;
    return this;
  }

  /**
   * @returns {this}
   */
  withChipDataIgnore() {
    this.chipData = DocScanConstants.IGNORE;
    return this;
  }

  /**
   * Builds a {@link RequestedTextExtractionTask} using the values supplied to the builder
   *
   * @returns {RequestedTextExtractionTask}
   */
  build() {
    Validation.notNullOrEmpty(this.manualCheck, 'manualCheck');

    const config = new RequestedTextExtractionConfig(this.manualCheck, this.chipData);
    return new RequestedTextExtractionTask(config);
  }
}

module.exports = RequestedTextExtractionTaskBuilder;
