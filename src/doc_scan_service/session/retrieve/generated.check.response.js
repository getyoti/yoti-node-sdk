'use strict';

const Validation = require('../../../yoti_common/validation');

class GeneratedCheckResponse {
  constructor(check) {
    if (new.target === GeneratedCheckResponse) {
      throw TypeError(`${new.target.name} cannot be instantiated`);
    }

    Validation.isString(check.id, 'id', true);
    this.id = check.id;
  }

  getId() {
    return this.id;
  }
}

module.exports = GeneratedCheckResponse;
