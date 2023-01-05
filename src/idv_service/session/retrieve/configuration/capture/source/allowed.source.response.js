const Validation = require('../../../../../../yoti_common/validation');

class AllowedSourceResponse {
  constructor(type) {
    Validation.isString(type, 'type');
    this.type = type;
  }

  getType() {
    return this.type;
  }
}

module.exports = AllowedSourceResponse;
