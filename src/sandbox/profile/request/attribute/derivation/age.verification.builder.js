const { SandboxAgeVerification } = require('./age.verification');
const { SandboxAnchor } = require('../anchor');
const { YotiDate } = require('../../../../../data_type/date');
const Validation = require('../../../../../yoti_common/validation');
const constants = require('../../../../../yoti_common/constants');

/**
 * @class SandboxAgeVerificationBuilder
 */
class SandboxAgeVerificationBuilder {
  /**
   * @param {YotiDate} value
   */
  withDateOfBirth(value) {
    Validation.instanceOf(value, YotiDate, 'value');
    this.dateOfBirth = value;
    return this;
  }

  /**
   * @param {integer} value
   */
  withAgeOver(value) {
    Validation.isInteger(value);
    return this.withDerivation(constants.ATTR_AGE_OVER + value);
  }

  /**
   * @param {integer} value
   */
  withAgeUnder(value) {
    Validation.isInteger(value);
    return this.withDerivation(constants.ATTR_AGE_UNDER + value);
  }

  /**
   * @param {string} value
   */
  withDerivation(value) {
    Validation.isString(value, 'derivation');
    this.derivation = value;
    return this;
  }

  /**
   * @param {SandboxAnchor[]} value
   */
  withAnchors(anchors) {
    Validation.isArrayOfType(anchors, SandboxAnchor, 'anchors');
    this.anchors = anchors;
    return this;
  }

  build() {
    return new SandboxAgeVerification(this.dateOfBirth, this.derivation, this.anchors);
  }
}

module.exports = {
  SandboxAgeVerificationBuilder,
};
