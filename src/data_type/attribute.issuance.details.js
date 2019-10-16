'use strict';

const Validation = require('../yoti_common/validation');

class AttributeIssuanceDetails {
  constructor(token, expiryDate, issuingAttributes) {
    Validation.isString(token, 'token');

    this.token = token;
    this.expiryDate = expiryDate;

    if (!issuingAttributes) {
      this.issuingAttributes = [];
    } else {
      Validation.hasOnlyStringValues(issuingAttributes, 'issuingAttributes');
      this.issuingAttributes = issuingAttributes;
    }
  }

  getToken() {
    return this.token;
  }

  getExpiryDate() {
    return this.expiryDate;
  }

  getIssuingAttributes() {
    return this.issuingAttributes;
  }
}

module.exports = AttributeIssuanceDetails;
