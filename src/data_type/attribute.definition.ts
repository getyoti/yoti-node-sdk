import Validation = require('../yoti_common/validation');

class AttributeDefinition {
  private name: string;

  constructor(name: string) {
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

export = AttributeDefinition;
