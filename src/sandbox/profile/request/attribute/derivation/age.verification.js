const { SandboxAttributeBuilder } = require('../attribute.builder');
const { SandboxAnchor } = require('../anchor');
const { YotiDate } = require('../../../../../data_type/date');
const Validation = require('../../../../../yoti_common/validation');
const constants = require('../../../../../yoti_common/constants');

/**
 * @class SandboxAgeVerification
 */
class SandboxAgeVerification {
  /**
   * @param {YotiDate} dateOfBirth
   * @param {string} supportedAgeDerivation
   * @param {SandboxAnchor[]} anchors
   */
  constructor(dateOfBirth, supportedAgeDerivation, anchors = null) {
    Validation.instanceOf(dateOfBirth, YotiDate, 'dateOfBirth');
    this.dateOfBirth = dateOfBirth.toISODateString();

    Validation.notNull(supportedAgeDerivation, 'derivation');
    this.supportedAgeDerivation = supportedAgeDerivation;

    if (anchors !== null) {
      Validation.isArrayOfType(anchors, SandboxAnchor);
    }
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
