'use strict';

const Validation = require('../../../../yoti_common/validation');

class IdentityProfileSchemeResponse {
  constructor(scheme) {
    Validation.isString(scheme.type, 'type');
    /** @private {string} */
    this.type = scheme.type;

    Validation.isString(scheme.objective, 'objective', true);
    /** @private {string} */
    this.objective = scheme.objective;
  }

  getType() {
    return this.type;
  }

  getObjective() {
    return this.objective;
  }
}

module.exports = IdentityProfileSchemeResponse;
