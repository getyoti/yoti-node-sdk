'use strict';

module.exports.Attribute = class Attribute {
  constructor(attrObj) {
    this.validateData(attrObj);

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

  validateData(attrData) {
    if (!(attrData instanceof Object) || this.isMissingAttribute(attrData)) {
      throw new Error('Invalid data for Attribute');
    }
  }

  isMissingAttribute(attrData) {
    const expectedAttr = ['value', 'name', 'sources', 'verifiers'];

    for (let i = 0; i < expectedAttr.length; i = i +1) {
      let attrName = expectedAttr[i];
      if (!attrData.hasOwnProperty(attrName)) {
        return true;
      }
    }
    return false;
  }
};