'use strict';

const DynamicPolicy = require('./dynamic.policy');
const WantedAttributeBuilder = require('./wanted.attribute.builder');
const constants = require('../../yoti_common/constants');

const SELFIE_AUTH_TYPE = 1;
const PIN_AUTH_TYPE = 2;

module.exports = class DynamicPolicyBuilder {
  constructor() {
    this.wantedAttributes = {};
    this.wantedAuthTypes = [];
  }

  /**
   * @param {WantedAttribute} wantedAttribute
   */
  addWantedAttribute(wantedAttribute) {
    let key = wantedAttribute.getName();
    if (wantedAttribute.getDerivation()) {
      key = wantedAttribute.getDerivation();
    }

    this.wantedAttributes[key] = wantedAttribute;
    return this;
  }

  /**
   * @param {boolean} optional
   * @param {string} name
   */
  withWantedAttribute(optional, name) {
    const wantedAttribute = new WantedAttributeBuilder()
      .withName(name)
      .withOptional(optional)
      .build();
    return this.addWantedAttribute(wantedAttribute);
  }

  /**
   * @param {boolean} optional
   */
  withFamilyName(optional = false) {
    return this.withWantedAttribute(optional, constants.ATTR_FAMILY_NAME);
  }

  /**
   * @param {boolean} optional
   */
  withGivenNames(optional = false) {
    return this.withWantedAttribute(optional, constants.ATTR_GIVEN_NAMES);
  }

  /**
   * @param {boolean} optional
   */
  withFullName(optional = false) {
    return this.withWantedAttribute(optional, constants.ATTR_FULL_NAME);
  }

  /**
   * @param {boolean} optional
   */
  withDateOfBirth(optional = false) {
    return this.withWantedAttribute(optional, constants.ATTR_DATE_OF_BIRTH);
  }

  /**
   * @param {string} age
   * @param {boolean} optional
   */
  withAgeOver(age, optional = false) {
    return this.withAgeDerivedAttribute(constants.ATTR_AGE_OVER + age, optional);
  }

  /**
   * @param {string} age
   * @param {boolean} optional
   */
  withAgeUnder(age, optional = false) {
    return this.withAgeDerivedAttribute(constants.ATTR_AGE_UNDER + age, optional);
  }

  /**
   * @param {string} derivation
   * @param {boolean} optional
   */
  withAgeDerivedAttribute(derivation, optional = false) {
    const wantedAttribute = new WantedAttributeBuilder()
      .withName(constants.ATTR_DATE_OF_BIRTH)
      .withDerivation(derivation)
      .withOptional(optional)
      .build();
    return this.addWantedAttribute(wantedAttribute);
  }

  /**
   * @param {boolean} optional
   */
  withGender(optional = false) {
    return this.withWantedAttribute(optional, constants.ATTR_GENDER);
  }

  /**
   * @param {boolean} optional
   */
  withPostalAddress(optional = false) {
    return this.withWantedAttribute(optional, constants.ATTR_POSTAL_ADDRESS);
  }

  /**
   * @param {boolean} optional
   */
  withStructuredPostalAddress(optional = false) {
    return this.withWantedAttribute(optional, constants.ATTR_STRUCTURED_POSTAL_ADDRESS);
  }

  /**
   * @param {boolean} optional
   */
  withNationality(optional = false) {
    return this.withWantedAttribute(optional, constants.ATTR_NATIONALITY);
  }

  /**
   * @param {boolean} optional
   */
  withPhoneNumber(optional = false) {
    return this.withWantedAttribute(optional, constants.ATTR_PHONE_NUMBER);
  }

  /**
   * @param {boolean} optional
   */
  withSelfie(optional = false) {
    return this.withWantedAttribute(optional, constants.ATTR_SELFIE);
  }

  /**
   * @param {boolean} optional
   */
  withEmail(optional = false) {
    return this.withWantedAttribute(optional, constants.ATTR_EMAIL_ADDRESS);
  }

  /**
   * @param {boolean} enabled
   */
  withSelfieAuthorisation(enabled = true) {
    if (enabled) {
      return this.withWantedAuthType(SELFIE_AUTH_TYPE);
    }
    return this;
  }

  /**
   * @param {boolean} enabled
   */
  withPinAuthorisation(enabled = true) {
    if (enabled) {
      return this.withWantedAuthType(PIN_AUTH_TYPE);
    }
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
   * @param {boolean} wantedRememberMeOptional
   */
  withWantedRememberMeOptional(wantedRememberMeOptional) {
    this.wantedRememberMeOptional = wantedRememberMeOptional;
    return this;
  }

  /**
   * @returns {DynamicPolicy}
   */
  build() {
    return new DynamicPolicy(
      Object.keys(this.wantedAttributes).map(k => this.wantedAttributes[k]),
      this.wantedAuthTypes,
      this.wantedRememberMe,
      this.wantedRememberMeOptional
    );
  }
};
