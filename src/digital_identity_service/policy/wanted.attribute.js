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
   * @param {string|null} derivation
   * @param {boolean|null} acceptSelfAsserted
   * @param {Constraints|null} constraints
   * @param {string[]|null} alternativeNames
   * @param {boolean|null} optional
   */
  // eslint-disable-next-line max-len
  constructor(name, derivation = null, acceptSelfAsserted = null, constraints = null, alternativeNames = null, optional = null) {
    Validation.isString(name, 'name');
    Validation.notNullOrEmpty(name, 'name');
    /** @private */
    this.name = name;

    if (derivation !== null) {
      Validation.isString(derivation, 'derivation');
    }
    /** @private */
    this.derivation = derivation;

    if (acceptSelfAsserted !== null) {
      Validation.isBoolean(acceptSelfAsserted, 'acceptSelfAsserted');
    }
    /** @private */
    this.acceptSelfAsserted = acceptSelfAsserted;

    if (constraints !== null) {
      Validation.instanceOf(constraints, Constraints, 'constraints');
    }
    /** @private */
    this.constraints = constraints;

    if (alternativeNames !== null) {
      Validation.isArrayOfStrings(alternativeNames, 'alternativeNames');
    }
    /** @private */
    this.alternativeNames = alternativeNames;

    if (optional !== null) {
      Validation.isBoolean(optional, 'optional');
    }
    /** @private */
    this.optional = optional;
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
   * Accept alternative names.
   *
   * These are names of attributes that can be used as fallback
   *
   * @returns {string[]}
   */
  getAlternativeNames() {
    return this.alternativeNames;
  }

  /**
   * Whether the attribute is wanted optionally
   *
   * @returns {boolean}
   */
  getOptional() {
    return this.optional;
  }

  /**
   * Returns serialized data for JSON.stringify()
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

    if (this.getAlternativeNames() !== null) {
      json.alternative_names = this.getAlternativeNames();
    }

    if (this.getOptional() !== null) {
      json.optional = this.getOptional();
    }

    return json;
  }
};
