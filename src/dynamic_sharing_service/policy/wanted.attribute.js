'use strict';

const Validation = require('../../yoti_common/validation');

/**
 * Defines the wanted attribute name and derivation.
 *
 * @class WantedAttribute
 */
module.exports = class WantedAttribute {
  /**
   * @param {string} name
   * @param {string} derivation
   */
  constructor(name, derivation = '') {
    Validation.isString(name, 'name');
    this.name = name;

    Validation.isString(derivation, 'derivation');
    this.derivation = derivation;
  }

  /**
   * Name identifying the WantedAttribute
   *
   * @returns {string}
   */
  getName() {
    return this.name;
  }

  /**
   * Additional derived criteria.
   *
   * @returns {string}
   */
  getDerivation() {
    return this.derivation;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      name: this.getName(),
      derivation: this.getDerivation(),
      optional: false,
    };
  }
};
