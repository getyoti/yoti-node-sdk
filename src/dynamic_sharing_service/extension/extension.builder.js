'use strict';

const Extension = require('./extension');

/**
 * Builder for Extension.
 *
 * @class ExtensionBuilder
 */
module.exports = class ExtensionBuilder {
  /**
   * @param {string} type
   */
  withType(type) {
    this.type = type;
    return this;
  }

  /**
   * @param {*} content
   */
  withContent(content) {
    this.content = content;
    return this;
  }

  /**
   * @returns {Extension}
   */
  build() {
    return new Extension(this.type, this.content);
  }
};
