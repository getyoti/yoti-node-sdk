const { TokenRequest } = require('./token');
const { SandboxAttributeBuilder } = require('./attribute/attribute.builder');
const constants = require('../../../yoti_common/constants');

const createAttribute = (
  name,
  value,
  anchors = []
) => new SandboxAttributeBuilder()
  .withName(name)
  .withValue(value)
  .withAnchors(anchors)
  .build();

class TokenRequestBuilder {
  constructor() {
    this.attributes = {};
  }

  withRememberMeId(value) {
    this.rememberMeId = value;
    return this;
  }

  withAttribute(sandboxAttribute) {
    const key = sandboxAttribute.getDerivation() != null ?
      sandboxAttribute.getDerivation() : sandboxAttribute.getName();
    this.attributes[key] = sandboxAttribute;
    return this;
  }

  withGivenNames(value, anchors = []) {
    const sandboxAttribute = createAttribute(constants.ATTR_GIVEN_NAMES, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  withFamilyName(value, anchors = []) {
    const sandboxAttribute = createAttribute(constants.ATTR_FAMILY_NAME, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  withFullName(value, anchors = []) {
    const sandboxAttribute = createAttribute(constants.ATTR_FULL_NAME, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  withDateOfBirth(value, anchors = []) {
    const sandboxAttribute = createAttribute(constants.ATTR_DATE_OF_BIRTH, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  withAgeVerification(sandboxAgeVerification) {
    return this.withAttribute(sandboxAgeVerification.toAttribute());
  }

  withGender(value, anchors = []) {
    const sandboxAttribute = createAttribute(constants.ATTR_GENDER, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  withPhoneNumber(value, anchors = []) {
    const sandboxAttribute = createAttribute(constants.ATTR_PHONE_NUMBER, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  withNationality(value, anchors = []) {
    const sandboxAttribute = createAttribute(constants.ATTR_NATIONALITY, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  withPostalAddress(value, anchors = []) {
    const sandboxAttribute = createAttribute(constants.ATTR_POSTAL_ADDRESS, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  withStructuredPostalAddress(value, anchors = []) {
    const sandboxAttribute = this
      .createAttribute(constants.ATTR_STRUCTURED_POSTAL_ADDRESS, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  withSelfie(value, anchors = []) {
    return this.withBase64Selfie(value, anchors);
  }

  withBase64Selfie(value, anchors = []) {
    const sandboxAttribute = createAttribute(constants.ATTR_SELFIE, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  withEmailAddress(value, anchors = []) {
    const sandboxAttribute = createAttribute(constants.ATTR_EMAIL_ADDRESS, value, anchors);
    return this.withAttribute(sandboxAttribute);
  }

  withDocumentDetails(value, anchors = []) {
    const sandboxAttribute = new SandboxAttributeBuilder()
      .withName(constants.ATTR_DOCUMENT_DETAILS)
      .withValue(value)
      .withOptional(true)
      .withAnchors(anchors)
      .build();
    return this.withAttribute(sandboxAttribute);
  }

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
