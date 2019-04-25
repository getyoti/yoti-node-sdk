'use strict';

const WantedAttribute = require('./wanted.attribute');

/**
 * Builder for WantedAttribute.
 *
 * @class WantedAttributeBuilder
 */
module.exports = class WantedAttributeBuilder {
  /**
   * @param {string} name
   */
  withName(name) {
    this.name = name;
    return this;
  }

  /**
   * @param {string} derivation
   */
  withDerivation(derivation) {
    this.derivation = derivation;
    return this;
  }

  /**
   * @param {boolean} optional
   */
  withOptional(optional) {
    this.optional = optional;
    return this;
  }

  /**
   * @returns {WantedAttribute}
   */
  build() {
    return new WantedAttribute(this.name, this.derivation, this.optional);
  }
};
