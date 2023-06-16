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
   * @param {Constraints} constraints
   */
  withConstraints(constraints) {
    this.constraints = constraints;
    return this;
  }

  /**
   * @param {Array} acceptSelfAsserted
   */
  withAcceptSelfAsserted(acceptSelfAsserted = true) {
    this.acceptSelfAsserted = acceptSelfAsserted;
    return this;
  }

  /**
   * @returns {WantedAttribute}
   */
  build() {
    return new WantedAttribute(
      this.name,
      this.derivation,
      this.acceptSelfAsserted,
      this.constraints
    );
  }
};
