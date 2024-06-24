'use strict';

const Validation = require('../../../../../yoti_common/validation');

class AdvancedIdentityProfileSchemeResponse {
  constructor(scheme) {
    Validation.isString(scheme.type, 'type');
    /** @private {string} */
    this.type = scheme.type;

    Validation.isString(scheme.objective, 'objective', true);
    /** @private {string} */
    this.objective = scheme.objective;

    Validation.isString(scheme.label, 'label');
    /** @private {string} */
    this.label = scheme.label;
  }

  /**
   * @returns {string}
   */
  getType() {
    return this.type;
  }

  /**
   * @returns {string}
   */
  getObjective() {
    return this.objective;
  }

  /**
   * @returns {string}
   */
  getLabel() {
    return this.label;
  }
}

module.exports = AdvancedIdentityProfileSchemeResponse;
