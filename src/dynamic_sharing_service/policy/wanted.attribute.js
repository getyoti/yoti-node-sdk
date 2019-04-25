'use strict';

const Validation = require('../../yoti_common/validation');

/**
 * Defines the wanted attribute name, derivation
 * and whether it is optional.
 *
 * @class WantedAttribute
 */
module.exports = class WantedAttribute {
  /**
   * @param {string} name
   * @param {string} derivation
   * @param {boolean} optional
   */
  constructor(name, derivation = '', optional = false) {
    Validation.isString(name, 'name');
    this.name = name;

    Validation.isString(derivation, 'derivation');
    this.derivation = derivation;

    Validation.isBoolean(optional, 'optional');
    this.optional = optional;
  }

  /**
   * @returns {string}
   */
  getName() {
    return this.name;
  }

  /**
   * @returns {string}
   */
  getDerivation() {
    return this.derivation;
  }

  /**
   * @returns {boolean}
   */
  isOptional() {
    return this.optional;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      name: this.getName(),
      derivation: this.getDerivation(),
      optional: this.isOptional(),
    };
  }
};
