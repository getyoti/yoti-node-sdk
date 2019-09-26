const { TokenRequest } = require('./token');
const { SandboxAttributeBuilder } = require('./attribute/attribute.builder');
const { SandboxAgeVerification } = require('./attribute/derivation/age.verification');
const { YotiDate } = require('../../../data_type/date');
const constants = require('../../../yoti_common/constants');
const Validation = require('../../../yoti_common/validation');

/**
 * @param {string} name
 * @param {string} value
 * @param {SandboxAnchor[]} anchors
 */
const createAttribute = (
  name,
  value,
  anchors
) => new SandboxAttributeBuilder()
  .withName(name)
  .withValue(value)
  .withAnchors(anchors)
  .build();

/**
 * @class TokenRequestBuilder
 */
class TokenRequestBuilder {
  /**
   * Set initial property values.
   */
  constructor() {
    this.attributes = {};
  }

  /**
   * @param {string} value
   *
   * @returns {TokenRequestBuilder}
   */
  withRememberMeId(value) {
    this.rememberMeId = value;
    return this;
  }

  /**
   * @param {SandboxAttribute} value
   *
   * @returns {TokenRequestBuilder}
   */
  withAttribute(sandboxAttribute) {
    const key = sandboxAttribute.getDerivation() != null ?
      sandboxAttribute.getDerivation() : sandboxAttribute.getName();
    this.attributes[key] = sandboxAttribute;
    return this;
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {TokenRequestBuilder}
   */
  withGivenNames(value, anchors = null) {
    const sandboxAttribute = createAttribute(constants.ATTR_GIVEN_NAMES, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {TokenRequestBuilder}
   */
  withFamilyName(value, anchors = null) {
    const sandboxAttribute = createAttribute(constants.ATTR_FAMILY_NAME, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {TokenRequestBuilder}
   */
  withFullName(value, anchors = null) {
    const sandboxAttribute = createAttribute(constants.ATTR_FULL_NAME, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {YotiDate} value
   * @param {SandboxAnchor[]}
   *
   * @returns {TokenRequestBuilder}
   */
  withDateOfBirth(value, anchors = null) {
    Validation.instanceOf(value, YotiDate, 'value');
    const sandboxAttribute = createAttribute(
      constants.ATTR_DATE_OF_BIRTH,
      value.toISODateString(),
      anchors
    );
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {SandboxAgeVerification} sandboxAgeVerification
   *
   * @returns {TokenRequestBuilder}
   */
  withAgeVerification(sandboxAgeVerification) {
    Validation.instanceOf(sandboxAgeVerification, SandboxAgeVerification, 'sandboxAgeVerification');
    return this.withAttribute(sandboxAgeVerification.toAttribute());
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {TokenRequestBuilder}
   */
  withGender(value, anchors = null) {
    const sandboxAttribute = createAttribute(constants.ATTR_GENDER, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {TokenRequestBuilder}
   */
  withPhoneNumber(value, anchors = null) {
    const sandboxAttribute = createAttribute(constants.ATTR_PHONE_NUMBER, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {TokenRequestBuilder}
   */
  withNationality(value, anchors = null) {
    const sandboxAttribute = createAttribute(constants.ATTR_NATIONALITY, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {TokenRequestBuilder}
   */
  withPostalAddress(value, anchors = null) {
    const sandboxAttribute = createAttribute(constants.ATTR_POSTAL_ADDRESS, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {TokenRequestBuilder}
   */
  withStructuredPostalAddress(value, anchors = null) {
    const sandboxAttribute = createAttribute(
      constants.ATTR_STRUCTURED_POSTAL_ADDRESS,
      value,
      anchors
    );
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {TokenRequestBuilder}
   */
  withSelfie(value, anchors = null) {
    return this.withBase64Selfie(Buffer.from(value).toString('base64'), anchors);
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {TokenRequestBuilder}
   */
  withBase64Selfie(value, anchors = null) {
    const sandboxAttribute = createAttribute(constants.ATTR_SELFIE, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {TokenRequestBuilder}
   */
  withEmailAddress(value, anchors = null) {
    const sandboxAttribute = createAttribute(constants.ATTR_EMAIL_ADDRESS, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @param {string} value
   * @param {SandboxAnchor[]}
   *
   * @returns {TokenRequestBuilder}
   */
  withDocumentDetails(value, anchors = null) {
    const sandboxAttribute = new SandboxAttributeBuilder()
      .withName(constants.ATTR_DOCUMENT_DETAILS)
      .withValue(value)
      .withOptional(true)
      .withAnchors(anchors)
      .build();
    return this.withAttribute(sandboxAttribute);
  }

  /**
   * @returns {TokenRequest}
   */
  build() {
    return new TokenRequest(
      this.rememberMeId,
      Object.keys(this.attributes).map(k => this.attributes[k])
    );
  }
}

module.exports = {
  TokenRequestBuilder,
};
