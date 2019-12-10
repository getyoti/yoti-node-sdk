'use strict';

const Validation = require('../yoti_common/validation');
const AttributeDefinition = require('./attribute.definition');

class AttributeIssuanceDetails {
  /**
   * @param {string} token
   * @param {Date|undefined} expiryDate
   * @param {string[]} issuingAttributes
   */
  constructor(token, expiryDate, issuingAttributes = []) {
    Validation.isString(token, 'token');
    this.token = token;

    if (expiryDate !== undefined) {
      Validation.instanceOf(expiryDate, Date, 'expiryDate');
    }
    this.expiryDate = expiryDate;

    Validation.isArrayOfType(issuingAttributes, AttributeDefinition, 'issuingAttributes');
    this.issuingAttributes = issuingAttributes;
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
