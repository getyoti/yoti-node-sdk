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
   * @returns this
   */
  withName(name) {
    this.name = name;
    return this;
  }

  /**
   * @param {string} derivation
   * @returns this
   */
  withDerivation(derivation) {
    this.derivation = derivation;
    return this;
  }

  /**
   * @param {Constraints} constraints
   * @returns this
   */
  withConstraints(constraints) {
    this.constraints = constraints;
    return this;
  }

  /**
   * @param {boolean} [acceptSelfAsserted=true]
   * @returns this
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
