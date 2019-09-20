const { SandboxAttributeBuilder } = require('../attribute.builder');
const Validation = require('../../../../../yoti_common/validation');
const constants = require('../../../../../yoti_common/constants');

class SandboxAgeVerification {
  constructor(dateOfBirth, supportedAgeDerivation, anchors) {
    Validation.notNull(dateOfBirth, 'dateOfBirth');
    Validation.notNull(supportedAgeDerivation, 'derivation');

    this.dateOfBirth = dateOfBirth;
    this.supportedAgeDerivation = supportedAgeDerivation;
    this.anchors = anchors;
  }

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
