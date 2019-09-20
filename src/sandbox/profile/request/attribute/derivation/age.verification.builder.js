const { SandboxAgeVerification } = require('./age.verification');
const Validation = require('../../../../../yoti_common/validation');
const constants = require('../../../../../yoti_common/constants');

class SandboxAgeVerificationBuilder {
  withDateOfBirth(value) {
    Validation.notNull(value, 'dateOfBirth');
    this.dateOfBirth = value;
    return this;
  }

  withAgeOver(value) {
    Validation.isInteger(value);
    return this.withDerivation(constants.ATTR_AGE_OVER + value);
  }

  withAgeUnder(value) {
    Validation.isInteger(value);
    return this.withDerivation(constants.ATTR_AGE_UNDER + value);
  }

  withDerivation(value) {
    Validation.notNull(value, 'derivation');
    this.derivation = value;
    return this;
  }

  withAnchors(anchors) {
    Validation.notNull(anchors, 'anchors');
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
