'use strict';

const WantedAttribute = require('./wanted.attribute');

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

  build() {
    return new WantedAttribute(this.name, this.derivation, this.optional);
  }
};
