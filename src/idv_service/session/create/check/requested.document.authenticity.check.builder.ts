import RequestedDocumentAuthenticityCheck = require('./requested.document.authenticity.check');
import RequestedDocumentAuthenticityConfig = require('./requested.document.authenticity.config');
import IDVConstants = require('../../../idv.constants');

/**
 * Builder to assist the creation of {@link RequestedDocumentAuthenticityCheck}.
 *
 * @class RequestedDocumentAuthenticityCheckBuilder
 */
class RequestedDocumentAuthenticityCheckBuilder {
  /**
   * Requires that a manual follow-up check is always performed
   *
   * @returns {this}
   */
  withManualCheckAlways() {
    this.manualCheck = IDVConstants.ALWAYS;
    return this;
  }

  /**
   * Requires that a manual follow-up check is performed only on failed Checks,
   * and those with a low level of confidence
   *
   * @returns {this}
   */
  withManualCheckFallback() {
    this.manualCheck = IDVConstants.FALLBACK;
    return this;
  }

  /**
   * Requires that only an automated Check is performed.  No manual follow-up
   * Check will ever be initiated
   *
   * @returns {this}
   */
  withManualCheckNever() {
    this.manualCheck = IDVConstants.NEVER;
    return this;
  }

  /**
   * Build a {@link RequestedDocumentAuthenticityCheck} using the values supplied to the builder
   *
   * @returns {RequestedDocumentAuthenticityCheck}
   */
  build() {
    const config = new RequestedDocumentAuthenticityConfig(this.manualCheck);
    return new RequestedDocumentAuthenticityCheck(config);
  }
}

export default RequestedDocumentAuthenticityCheckBuilder;
