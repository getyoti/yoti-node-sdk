'use strict';

module.exports.Attribute = class Attribute {
  constructor(attrObj) {
    this.value = attrObj.value;
    this.name = attrObj.name;
    this.sources = attrObj.sources;
    this.verifiers = attrObj.verifiers;
  }

  getValue() {
    return this.value;
  }

  getName() {
    return this.name;
  }

  getSources() {
    return this.sources;
  }

  getVerifiers() {
    return this.verifiers;
  }
};