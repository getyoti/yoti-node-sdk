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

  getType() {
    return this.type;
  }

  getObjective() {
    return this.objective;
  }

  getLabel() {
    return this.label;
  }
}

module.exports = AdvancedIdentityProfileSchemeResponse;
