'use strict';

const constants = require('./constants');
const {DocumentDetails} = require('../data_type/document.details');

module.exports.AttributeConverter = class AttributeConverter {
  static convertValueBaseOnAttributeName(value, attrName) {
    if (!value) {
      return null;
    }

    switch(attrName) {
      case constants.ATTR_DOCUMENT_DETAILS:
        return new DocumentDetails(value);
      default:
        return value;
    }
  }
};