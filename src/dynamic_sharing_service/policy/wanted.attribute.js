'use strict';

const Validation = require('../../yoti_common/validation');
const Constraints = require('./constraints');
const ConstraintsBuilder = require('./constraints.builder');

/**
 * Defines the wanted attribute name and derivation.
 *
 * @class WantedAttribute
 */
module.exports = class WantedAttribute {
  /**
   * @param {string} name
   * @param {string} derivation
   * @param {boolean} acceptSelfAsserted
   * @param {Constraints} constraints
   */
  constructor(name, derivation = '', acceptSelfAsserted = true, constraints = null) {
    Validation.isString(name, 'name');
    this.name = name;

    Validation.isString(derivation, 'derivation');
    this.derivation = derivation;

    Validation.isBoolean(acceptSelfAsserted, 'acceptSelfAsserted');
    this.acceptSelfAsserted = acceptSelfAsserted;

    if (constraints === null) {
      this.constraints = new ConstraintsBuilder().build();
    } else {
      Validation.instanceOf(constraints, Constraints, 'constraints');
      this.constraints = constraints;
    }
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
   * List of constraints.
   *
   * @returns {Constraints}
   */
  getConstraints() {
    return this.constraints;
  }

  /**
   * Accept self asserted.
   *
   * @returns {boolean}
   */
  getAcceptSelfAsserted() {
    return this.acceptSelfAsserted;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      name: this.getName(),
      derivation: this.getDerivation(),
      optional: false,
      constraints: this.getConstraints(),
      accept_self_asserted: this.getAcceptSelfAsserted(),
    };
  }
};
