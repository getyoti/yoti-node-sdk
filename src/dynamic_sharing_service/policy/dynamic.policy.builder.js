'use strict';

const DynamicPolicy = require('./dynamic.policy');
const WantedAttributeBuilder = require('./wanted.attribute.builder');
const WantedAttribute = require('./wanted.attribute');
const constants = require('../../yoti_common/constants');
const Validation = require('../../yoti_common/validation');

const SELFIE_AUTH_TYPE = 1;
const PIN_AUTH_TYPE = 2;

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
   * @param {boolean} optional
   */
  withWantedAttributeByName(name, optional = false) {
    const wantedAttribute = new WantedAttributeBuilder()
      .withName(name)
      .withOptional(optional)
      .build();
    return this.withWantedAttribute(wantedAttribute);
  }

  /**
   * @param {boolean} optional
   */
  withFamilyName(optional = false) {
    return this.withWantedAttributeByName(constants.ATTR_FAMILY_NAME, optional);
  }

  /**
   * @param {boolean} optional
   */
  withGivenNames(optional = false) {
    return this.withWantedAttributeByName(constants.ATTR_GIVEN_NAMES, optional);
  }

  /**
   * @param {boolean} optional
   */
  withFullName(optional = false) {
    return this.withWantedAttributeByName(constants.ATTR_FULL_NAME, optional);
  }

  /**
   * @param {boolean} optional
   */
  withDateOfBirth(optional = false) {
    return this.withWantedAttributeByName(constants.ATTR_DATE_OF_BIRTH, optional);
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
    return this.withWantedAttribute(wantedAttribute);
  }

  /**
   * @param {boolean} optional
   */
  withGender(optional = false) {
    return this.withWantedAttributeByName(constants.ATTR_GENDER, optional);
  }

  /**
   * @param {boolean} optional
   */
  withPostalAddress(optional = false) {
    return this.withWantedAttributeByName(constants.ATTR_POSTAL_ADDRESS, optional);
  }

  /**
   * @param {boolean} optional
   */
  withStructuredPostalAddress(optional = false) {
    return this.withWantedAttributeByName(constants.ATTR_STRUCTURED_POSTAL_ADDRESS, optional);
  }

  /**
   * @param {boolean} optional
   */
  withNationality(optional = false) {
    return this.withWantedAttributeByName(constants.ATTR_NATIONALITY, optional);
  }

  /**
   * @param {boolean} optional
   */
  withPhoneNumber(optional = false) {
    return this.withWantedAttributeByName(constants.ATTR_PHONE_NUMBER, optional);
  }

  /**
   * @param {boolean} optional
   */
  withSelfie(optional = false) {
    return this.withWantedAttributeByName(constants.ATTR_SELFIE, optional);
  }

  /**
   * @param {boolean} optional
   */
  withEmail(optional = false) {
    return this.withWantedAttributeByName(constants.ATTR_EMAIL_ADDRESS, optional);
  }

  /**
   * @param {boolean} enabled
   */
  withSelfieAuthentication(enabled = true) {
    if (enabled) {
      return this.withWantedAuthType(SELFIE_AUTH_TYPE);
    }
    return this;
  }

  /**
   * @param {boolean} enabled
   */
  withPinAuthentication(enabled = true) {
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
