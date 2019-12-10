'use strict';

const Validation = require('../yoti_common/validation');

class AttributeDefinition {
  constructor(name) {
    Validation.isString(name, 'name');

    this.name = name;
  }

  getName() {
    return this.name;
  }

  toJSON() {
    return {
      name: this.name,
    };
  }
}

module.exports = AttributeDefinition;
