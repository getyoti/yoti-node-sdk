'use strict';

const Validation = require('../../../../../yoti_common/validation');

class TypeRestriction {
  /**
   * @param {string} inclusion
   * @param {string[]} documentTypes
   */
  constructor(inclusion, documentTypes) {
    Validation.notNullOrEmpty(inclusion, 'inclusion');
    Validation.isString(inclusion, 'inclusion');
    this.inclusion = inclusion;

    Validation.isArrayOfStrings(documentTypes, 'documentTypes');
    this.documentTypes = documentTypes;
  }

  toJSON() {
    return {
      inclusion: this.inclusion,
      document_types: this.documentTypes,
    };
  }
}

module.exports = TypeRestriction;
