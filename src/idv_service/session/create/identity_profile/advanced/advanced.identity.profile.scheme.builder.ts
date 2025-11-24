import Validation = require('../../../../../yoti_common/validation');
import AdvancedIdentityProfileSchemeConfig = require('./advanced.identity.profile.scheme.config');
import AdvancedIdentityProfileScheme = require('./advanced.identity.profile.scheme');

class AdvancedIdentityProfileSchemeBuilder {
  /**
   * @param {string} type
   * @returns {AdvancedIdentityProfileSchemeBuilder}
   */
  withType(type) {
    Validation.isString(type, 'type');
    this.type = type;
    return this;
  }

  /**
   * @param {string} objective
   * @returns {AdvancedIdentityProfileSchemeBuilder}
   */
  withObjective(objective) {
    Validation.isString(objective, 'objective');
    this.objective = objective;
    return this;
  }

  /**
   * @param {string} label
   * @returns {AdvancedIdentityProfileSchemeBuilder}
   */
  withLabel(label) {
    Validation.isString(label, 'label');
    this.label = label;
    return this;
  }

  /**
   * @param {AdvancedIdentityProfileSchemeConfig} config
   * @returns {AdvancedIdentityProfileSchemeBuilder}
   */
  withConfig(config) {
    Validation.instanceOf(config, AdvancedIdentityProfileSchemeConfig, 'config');
    this.config = config;
    return this;
  }

  /**
   * @returns {AdvancedIdentityProfileScheme}
   */
  build() {
    return new AdvancedIdentityProfileScheme(this.type, this.objective, this.label, this.config);
  }
}

export default AdvancedIdentityProfileSchemeBuilder;
