'use strict';

const DynamicPolicy = require('./dynamic.policy');
const WantedAttributeBuilder = require('./wanted.attribute.builder');
const WantedAttribute = require('./wanted.attribute');
const constants = require('../../yoti_common/constants');
const Validation = require('../../yoti_common/validation');

const SELFIE_AUTH_TYPE = 1;
const PIN_AUTH_TYPE = 2;

/**
 * Remove all matching elements from an array.
 * @param {number} element
 * @param {Array} arr
 */
const removeMatchingElements = (element, arr) => arr.filter(value => value !== element);

/**
 * Builder for DynamicPolicy.
 *
 * @class DynamicPolicyBuilder
 */
module.exports = class DynamicPolicyBuilder {
  constructor() {
    this.wantedAttributes = {};
    this.wantedAuthTypes = [];
  }

  /**
   * @param {WantedAttribute} wantedAttribute
   */
  withWantedAttribute(wantedAttribute) {
    Validation.instanceOf(wantedAttribute, WantedAttribute, 'wantedAttribute');

    let key = wantedAttribute.getName();
    if (wantedAttribute.getDerivation()) {
      key = wantedAttribute.getDerivation();
    }

    this.wantedAttributes[key] = wantedAttribute;
    return this;
  }

  /**
   * @param {string} name
   */
  withWantedAttributeByName(name) {
    const wantedAttribute = new WantedAttributeBuilder()
      .withName(name)
      .build();
    return this.withWantedAttribute(wantedAttribute);
  }

  withFamilyName() {
    return this.withWantedAttributeByName(constants.ATTR_FAMILY_NAME);
  }

  withGivenNames() {
    return this.withWantedAttributeByName(constants.ATTR_GIVEN_NAMES);
  }

  withFullName() {
    return this.withWantedAttributeByName(constants.ATTR_FULL_NAME);
  }

  withDateOfBirth() {
    return this.withWantedAttributeByName(constants.ATTR_DATE_OF_BIRTH);
  }

  /**
   * @param {int} age
   */
  withAgeOver(age) {
    Validation.isInteger(age, 'age');
    return this.withAgeDerivedAttribute(constants.ATTR_AGE_OVER + age);
  }

  /**
   * @param {int} age
   */
  withAgeUnder(age) {
    Validation.isInteger(age, 'age');
    return this.withAgeDerivedAttribute(constants.ATTR_AGE_UNDER + age);
  }

  /**
   * @param {string} derivation
   */
  withAgeDerivedAttribute(derivation) {
    const wantedAttribute = new WantedAttributeBuilder()
      .withName(constants.ATTR_DATE_OF_BIRTH)
      .withDerivation(derivation)
      .build();
    return this.withWantedAttribute(wantedAttribute);
  }

  withGender() {
    return this.withWantedAttributeByName(constants.ATTR_GENDER);
  }

  withPostalAddress() {
    return this.withWantedAttributeByName(constants.ATTR_POSTAL_ADDRESS);
  }

  withStructuredPostalAddress() {
    return this.withWantedAttributeByName(constants.ATTR_STRUCTURED_POSTAL_ADDRESS);
  }

  withNationality() {
    return this.withWantedAttributeByName(constants.ATTR_NATIONALITY);
  }

  withPhoneNumber() {
    return this.withWantedAttributeByName(constants.ATTR_PHONE_NUMBER);
  }

  withSelfie() {
    return this.withWantedAttributeByName(constants.ATTR_SELFIE);
  }

  withEmail() {
    return this.withWantedAttributeByName(constants.ATTR_EMAIL_ADDRESS);
  }

  /**
   * @param {boolean} enabled
   */
  withSelfieAuthentication(enabled = true) {
    if (enabled) {
      return this.withWantedAuthType(SELFIE_AUTH_TYPE);
    }

    this.wantedAuthTypes = removeMatchingElements(SELFIE_AUTH_TYPE, this.wantedAuthTypes);
    return this;
  }

  /**
   * @param {boolean} enabled
   */
  withPinAuthentication(enabled = true) {
    if (enabled) {
      return this.withWantedAuthType(PIN_AUTH_TYPE);
    }

    this.wantedAuthTypes = removeMatchingElements(PIN_AUTH_TYPE, this.wantedAuthTypes);
    return this;
  }

  /**
   * @param {integer} wantedAuthType
   */
  withWantedAuthType(wantedAuthType) {
    this.wantedAuthTypes.push(wantedAuthType);
    return this;
  }

  /**
   * @param {boolean} wantedRememberMe
   */
  withWantedRememberMe(wantedRememberMe) {
    this.wantedRememberMe = wantedRememberMe;
    return this;
  }

  /**
   * @returns {DynamicPolicy}
   */
  build() {
    return new DynamicPolicy(
      Object.keys(this.wantedAttributes).map(k => this.wantedAttributes[k]),
      this.wantedAuthTypes.filter((value, index, self) => self.indexOf(value) === index),
      this.wantedRememberMe,
      false
    );
  }
};
