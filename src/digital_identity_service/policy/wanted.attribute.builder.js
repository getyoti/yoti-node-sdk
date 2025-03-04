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
   * @typedef {import('./constraints')} Constraints
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
   * @param {string} alternativeName
   * @returns this
   */
  withAlternativeName(alternativeName) {
    this.alternativeNames = [...(this.alternativeNames || []), alternativeName];
    return this;
  }

  /**
   * @param {string[]} alternativeNames
   * @returns this
   */
  withAlternativeNames(alternativeNames) {
    this.alternativeNames = alternativeNames;
    return this;
  }

  /**
   * @param {boolean} [optional=true]
   * @returns this
   */
  withOptional(optional = true) {
    this.optional = optional;
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
      this.constraints,
      this.alternativeNames,
      this.optional
    );
  }
};
