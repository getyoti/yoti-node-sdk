'use strict';

const IdentityProfileConfig = require('./identity.profile.config');
const Validation = require('../../../yoti_common/validation');

/**
 * Builder to assist in the creation of {@link IdentityProfileConfig}.
 *
 * @class IdentityProfileBuilder
 */
class IdentityProfileBuilder {
  /**
   * Sets which trust framework this identity profile should be verified against.
   *
   * @returns {this}
   */
  withTrustFramework(framework) {
    Validation.isString(framework, 'trustFramework');
    this.trustFramework = framework;
    return this;
  }

  /**
   * Sets the scheme this identity profile should satisfy.
   *
   * @param {string} type
   * @param {string} objective
   *
   * @returns {this}
   */
  withScheme(type, objective) {
    Validation.isString(type, 'type');
    Validation.isString(objective, 'type', true);

    this.scheme = { type };

    if (objective) this.scheme.objective = objective;

    return this;
  }

  build() {
    return new IdentityProfileConfig(
      this.trustFramework,
      this.scheme
    );
  }
}

module.exports = IdentityProfileBuilder;
