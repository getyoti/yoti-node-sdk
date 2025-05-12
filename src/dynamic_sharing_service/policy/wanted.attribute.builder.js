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
   * @typedef {import('./constraints')} Constraints
   *
   * @param {Constraints} constraints
   */
  withConstraints(constraints) {
    this.constraints = constraints;
    return this;
  }

  /**
   * @param {boolean} acceptSelfAsserted
   */
  withAcceptSelfAsserted(acceptSelfAsserted = true) {
    this.acceptSelfAsserted = acceptSelfAsserted;
    return this;
  }

  /**
   * @param {string} alternativeName
   */
  withAlternativeName(alternativeName) {
    this.alternativeNames = [...(this.alternativeNames || []), alternativeName];
    return this;
  }

  /**
   * @param {string[]} alternativeNames
   */
  withAlternativeNames(alternativeNames) {
    this.alternativeNames = alternativeNames;
    return this;
  }

  /**
   * @param {boolean} [optional=true]
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
