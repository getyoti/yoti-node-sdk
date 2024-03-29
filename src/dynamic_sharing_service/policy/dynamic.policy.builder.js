'use strict';

const crypto = require('crypto');

const DynamicPolicy = require('./dynamic.policy');
const WantedAttributeBuilder = require('./wanted.attribute.builder');
const WantedAttribute = require('./wanted.attribute');
const constants = require('../../yoti_common/constants');
const Validation = require('../../yoti_common/validation');

const SELFIE_AUTH_TYPE = 1;
const PIN_AUTH_TYPE = 2;

/**
 * @typedef {import('./constraints')} Constraints
 */

/**
 * Builder for DynamicPolicy.
 *
 * @class DynamicPolicyBuilder
 */
module.exports = class DynamicPolicyBuilder {
  constructor() {
    /** @private */
    this.wantedAttributes = {};
    /** @private */
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
    if (wantedAttribute.getConstraints()) {
      const hash = crypto
        .createHash('sha256')
        .update(JSON.stringify(wantedAttribute.getConstraints()), 'utf8')
        .digest('hex');

      key = `${key}-${hash}`;
    }

    this.wantedAttributes[key] = wantedAttribute;

    return this;
  }

  /**
   * @param {string} name
   * @param {Constraints} constraints
   * @param {boolean|null} acceptSelfAsserted
   */
  withWantedAttributeByName(name, constraints = null, acceptSelfAsserted = null) {
    const wantedAttributeBuilder = new WantedAttributeBuilder()
      .withName(name);

    if (constraints !== null) {
      wantedAttributeBuilder.withConstraints(constraints);
    }

    if (acceptSelfAsserted !== null) {
      wantedAttributeBuilder.withAcceptSelfAsserted(acceptSelfAsserted);
    }

    return this.withWantedAttribute(wantedAttributeBuilder.build());
  }

  /**
   * @param {Constraints} constraints
   * @param {boolean} acceptSelfAsserted
   */
  withFamilyName(constraints = null, acceptSelfAsserted = null) {
    return this.withWantedAttributeByName(
      constants.ATTR_FAMILY_NAME,
      constraints,
      acceptSelfAsserted
    );
  }

  /**
   * @param {Constraints} constraints
   * @param {boolean} acceptSelfAsserted
   */
  withGivenNames(constraints = null, acceptSelfAsserted = null) {
    return this.withWantedAttributeByName(
      constants.ATTR_GIVEN_NAMES,
      constraints,
      acceptSelfAsserted
    );
  }

  /**
   * @param {Constraints} constraints
   * @param {boolean} acceptSelfAsserted
   */
  withFullName(constraints = null, acceptSelfAsserted = null) {
    return this.withWantedAttributeByName(
      constants.ATTR_FULL_NAME,
      constraints,
      acceptSelfAsserted
    );
  }

  /**
   * @param {Constraints} constraints
   * @param {boolean} acceptSelfAsserted
   */
  withDateOfBirth(constraints = null, acceptSelfAsserted = null) {
    return this.withWantedAttributeByName(
      constants.ATTR_DATE_OF_BIRTH,
      constraints,
      acceptSelfAsserted
    );
  }

  /**
   * @param {number} age
   * @param {Constraints} constraints
   * @param {boolean} acceptSelfAsserted
   */
  withAgeOver(age, constraints = null, acceptSelfAsserted = null) {
    Validation.isInteger(age, 'age');
    return this.withAgeDerivedAttribute(
      constants.ATTR_AGE_OVER + age,
      constraints,
      acceptSelfAsserted
    );
  }

  /**
   * @param {number} age
   * @param {Constraints} constraints
   * @param {boolean} acceptSelfAsserted
   */
  withAgeUnder(age, constraints = null, acceptSelfAsserted = null) {
    Validation.isInteger(age, 'age');
    return this.withAgeDerivedAttribute(
      constants.ATTR_AGE_UNDER + age,
      constraints,
      acceptSelfAsserted
    );
  }

  /**
   * @param {string} derivation
   * @param {Constraints} constraints
   * @param {boolean} acceptSelfAsserted
   */
  withAgeDerivedAttribute(derivation, constraints = null, acceptSelfAsserted = null) {
    const wantedAttributeBuilder = new WantedAttributeBuilder()
      .withName(constants.ATTR_DATE_OF_BIRTH)
      .withDerivation(derivation)
      .withAcceptSelfAsserted(acceptSelfAsserted);

    if (constraints !== null) {
      wantedAttributeBuilder.withConstraints(constraints);
    }

    return this.withWantedAttribute(wantedAttributeBuilder.build());
  }

  /**
   * @param {Constraints} constraints
   * @param {boolean} acceptSelfAsserted
   */
  withGender(constraints = null, acceptSelfAsserted = null) {
    return this.withWantedAttributeByName(
      constants.ATTR_GENDER,
      constraints,
      acceptSelfAsserted
    );
  }

  /**
   * @param {Constraints} constraints
   * @param {boolean} acceptSelfAsserted
   */
  withPostalAddress(constraints = null, acceptSelfAsserted = null) {
    return this.withWantedAttributeByName(
      constants.ATTR_POSTAL_ADDRESS,
      constraints,
      acceptSelfAsserted
    );
  }

  /**
   * @param {Constraints} constraints
   * @param {boolean} acceptSelfAsserted
   */
  withStructuredPostalAddress(constraints = null, acceptSelfAsserted = null) {
    return this.withWantedAttributeByName(
      constants.ATTR_STRUCTURED_POSTAL_ADDRESS,
      constraints,
      acceptSelfAsserted
    );
  }

  /**
   * @param {Constraints} constraints
   * @param {boolean} acceptSelfAsserted
   */
  withNationality(constraints = null, acceptSelfAsserted = null) {
    return this.withWantedAttributeByName(
      constants.ATTR_NATIONALITY,
      constraints,
      acceptSelfAsserted
    );
  }

  /**
   * @param {Constraints} constraints
   * @param {boolean} acceptSelfAsserted
   */
  withPhoneNumber(constraints = null, acceptSelfAsserted = null) {
    return this.withWantedAttributeByName(
      constants.ATTR_PHONE_NUMBER,
      constraints,
      acceptSelfAsserted
    );
  }

  /**
   * @param {Constraints} constraints
   * @param {boolean} acceptSelfAsserted
   */
  withSelfie(constraints = null, acceptSelfAsserted = null) {
    return this.withWantedAttributeByName(
      constants.ATTR_SELFIE,
      constraints,
      acceptSelfAsserted
    );
  }

  /**
   * @param {Constraints} constraints
   * @param {boolean} acceptSelfAsserted
   */
  withDocumentDetails(constraints = null, acceptSelfAsserted = null) {
    return this.withWantedAttributeByName(
      constants.ATTR_DOCUMENT_DETAILS,
      constraints,
      acceptSelfAsserted
    );
  }

  /**
   * @param {Constraints} constraints
   * @param {boolean} acceptSelfAsserted
   */
  withDocumentImages(constraints = null, acceptSelfAsserted = null) {
    return this.withWantedAttributeByName(
      constants.ATTR_DOCUMENT_IMAGES,
      constraints,
      acceptSelfAsserted
    );
  }

  /**
   * @param {Constraints} constraints
   * @param {boolean} acceptSelfAsserted
   */
  withEmail(constraints = null, acceptSelfAsserted = null) {
    return this.withWantedAttributeByName(
      constants.ATTR_EMAIL_ADDRESS,
      constraints,
      acceptSelfAsserted
    );
  }

  /**
   * @param {boolean} enabled
   */
  withSelfieAuthentication(enabled = true) {
    return this.withWantedAuthType(SELFIE_AUTH_TYPE, enabled);
  }

  /**
   * @param {boolean} enabled
   */
  withPinAuthentication(enabled = true) {
    return this.withWantedAuthType(PIN_AUTH_TYPE, enabled);
  }

  /**
   * @param {number} wantedAuthType
   * @param {boolean} enabled
   */
  withWantedAuthType(wantedAuthType, enabled = true) {
    if (enabled) {
      this.wantedAuthTypes.push(wantedAuthType);
    } else {
      this.wantedAuthTypes = this.wantedAuthTypes.filter((value) => value !== wantedAuthType);
    }

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
   * @typedef {Object} SimpleScheme
   * @property {string} type
   * @property {string} [objective]
   *
   * @param {Object} identityProfileRequirements
   * @param {string} identityProfileRequirements.trust_framework
   * @param {SimpleScheme} identityProfileRequirements.scheme
   */
  withIdentityProfileRequirements(identityProfileRequirements) {
    this.identityProfileRequirements = identityProfileRequirements;
    return this;
  }

  /**
   * @typedef {Object} AdvancedScheme
   * @property {string} type
   * @property {string} objective
   * @property {string} label
   *
   * @typedef {Object} AdvancedProfileRequirements
   * @property {string} trust_framework - Expected: 'UK_TFIDA' | 'YOTI_GLOBAL'
   * @property {Array<AdvancedScheme>} schemes
   *
   * @param {Object} advancedIdentityProfileRequirements
   * @param {Array<AdvancedProfileRequirements>} advancedIdentityProfileRequirements.profiles
   */
  withAdvancedIdentityProfileRequirements(advancedIdentityProfileRequirements) {
    this.advancedIdentityProfileRequirements = advancedIdentityProfileRequirements;
    return this;
  }

  /**
   * @returns {DynamicPolicy}
   */
  build() {
    return new DynamicPolicy(
      Object.keys(this.wantedAttributes).map((k) => this.wantedAttributes[k]),
      this.wantedAuthTypes.filter((value, index, self) => self.indexOf(value) === index),
      this.wantedRememberMe,
      this.identityProfileRequirements,
      this.advancedIdentityProfileRequirements
    );
  }
};
