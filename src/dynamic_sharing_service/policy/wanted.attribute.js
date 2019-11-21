'use strict';

const Validation = require('../../yoti_common/validation');
const Constraints = require('./constraints');

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
  constructor(name, derivation = null, acceptSelfAsserted = null, constraints = null) {
    Validation.isString(name, 'name');
    Validation.notNullOrEmpty(name, 'name');
    this.name = name;

    if (derivation !== null) {
      Validation.isString(derivation, 'derivation');
    }
    this.derivation = derivation;

    if (acceptSelfAsserted !== null) {
      Validation.isBoolean(acceptSelfAsserted, 'acceptSelfAsserted');
    }
    this.acceptSelfAsserted = acceptSelfAsserted;

    if (constraints !== null) {
      Validation.instanceOf(constraints, Constraints, 'constraints');
    }
    this.constraints = constraints;
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
   * List of constraints to add to an attribute.
   *
   * If you do not provide any particular constraints, Yoti will provide you with the
   * information from the most recently added source.
   *
   * @returns {Constraints}
   */
  getConstraints() {
    return this.constraints;
  }

  /**
   * Accept self asserted attributes.
   *
   * These are attributes that have been self-declared, and not verified by Yoti.
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
    const json = {
      name: this.getName(),
      optional: false,
    };

    if (this.getDerivation() !== null) {
      json.derivation = this.getDerivation();
    }

    if (this.getConstraints() instanceof Constraints) {
      json.constraints = this.getConstraints();
    }

    if ((typeof this.getAcceptSelfAsserted()) === 'boolean') {
      json.accept_self_asserted = this.getAcceptSelfAsserted();
    }

    return json;
  }
};
