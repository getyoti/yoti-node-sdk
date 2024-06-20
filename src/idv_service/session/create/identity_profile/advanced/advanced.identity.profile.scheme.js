'use strict';

const Validation = require('../../../../../yoti_common/validation');
const AdvancedIdentityProfileSchemeConfig = require('./advanced.identity.profile.scheme.config');

class AdvancedIdentityProfileScheme {
  /**
   * @param {string} type
   * @param {string} objective
   * @param {string} label
   * @param {AdvancedIdentityProfileSchemeConfig} [config]
   */
  constructor(type, objective, label, config) {
    Validation.isString(type, 'type');
    this.type = type;

    Validation.isString(objective, 'objective', true);
    if (objective) this.objective = objective;

    Validation.isString(label, 'label');
    this.label = label;

    if (config) {
      Validation.instanceOf(config, AdvancedIdentityProfileSchemeConfig, 'config');
      this.config = config;
    }
  }

  toJSON() {
    return {
      type: this.type,
      objective: this.objective,
      label: this.label,
      config: this.config,
    };
  }
}

module.exports = AdvancedIdentityProfileScheme;
