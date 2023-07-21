const Validation = require('../../../../../../yoti_common/validation');

class AllowedSourceResponse {
  constructor(type) {
    const currentClass = new.target;
    if (currentClass === AllowedSourceResponse) {
      throw new Error('AllowedSourceResponse can not be instantiated');
    }

    Validation.isString(type, 'type');
    this.type = type;
  }

  getType() {
    return this.type;
  }
}

module.exports = AllowedSourceResponse;
