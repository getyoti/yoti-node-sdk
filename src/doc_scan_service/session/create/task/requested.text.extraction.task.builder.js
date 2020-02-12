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
   * Sets the text extraction task to always fallback to a manual check
   *
   * @returns {this}
   */
  withManualCheckAlways() {
    this.manualCheck = DocScanConstants.ALWAYS;
    return this;
  }

  /**
   * Sets the text extraction task to fallback to a manual check if something has gone
   * wrong with the automated task
   *
   * @returns {this}
   */
  withManualCheckFallback() {
    this.manualCheck = DocScanConstants.FALLBACK;
    return this;
  }

  /**
   * Sets the text extraction task to never fallback to a manual check
   *
   * @returns {this}
   */
  withManualCheckNever() {
    this.manualCheck = DocScanConstants.NEVER;
    return this;
  }

  /**
   * Builds a {@link RequestedTextExtractionTask} using the values supplied to the builder
   *
   * @returns {RequestedTextExtractionTask}
   */
  build() {
    Validation.notNullOrEmpty(this.manualCheck, 'manualCheck');

    const config = new RequestedTextExtractionConfig(this.manualCheck);
    return new RequestedTextExtractionTask(config);
  }
}

module.exports = RequestedTextExtractionTaskBuilder;
