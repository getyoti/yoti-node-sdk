'use strict';

const Extension = require('./extension');
const Validation = require('../../yoti_common/validation');

const TRANSACTIONAL_FLOW = 'TRANSACTIONAL_FLOW';

/**
 * Builds a transactional flow Extension.
 *
 * @class TransactionalFlowExtensionBuilder
 */
module.exports = class TransactionalFlowExtensionBuilder {
  /**
   * Allows you to provide a non-null object representing the content to be submitted
   * in the TRANSACTIONAL_FLOW extension.
   *
   * @param {Object} content
   */
  withContent(content) {
    Validation.notNull(content, 'content');
    Validation.instanceOf(content, Object);
    this.content = content;
    return this;
  }

  /**
   * @returns {Extension} Extension with TRANSACTIONAL_FLOW type
   */
  build() {
    return new Extension(TRANSACTIONAL_FLOW, this.content);
  }
};
