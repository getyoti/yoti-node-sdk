const { SandboxAttributeBuilder } = require('../attribute.builder');
const { SandboxAnchor } = require('../anchor');
const Validation = require('../../../../../yoti_common/validation');
const constants = require('../../../../../yoti_common/constants');

/**
 * @class SandboxAgeVerification
 */
class SandboxAgeVerification {
  /**
   * @param {DateTime} dateOfBirth
   * @param {*} supportedAgeDerivation
   * @param {SandboxAnchor[]} anchors
   */
  constructor(dateOfBirth, supportedAgeDerivation, anchors = []) {
    Validation.notNull(dateOfBirth, 'dateOfBirth');
    this.dateOfBirth = dateOfBirth;

    Validation.notNull(supportedAgeDerivation, 'derivation');
    this.supportedAgeDerivation = supportedAgeDerivation;

    Validation.isArrayOfType(anchors, SandboxAnchor);
    this.anchors = anchors;
  }

  /**
   * @returns {SandboxAttribute}
   */
  toAttribute() {
    return new SandboxAttributeBuilder()
      .withName(constants.ATTR_DATE_OF_BIRTH)
      .withValue(this.dateOfBirth)
      .withDerivation(this.supportedAgeDerivation)
      .withAnchors(this.anchors)
      .build();
  }
}

module.exports = {
  SandboxAgeVerification,
};
