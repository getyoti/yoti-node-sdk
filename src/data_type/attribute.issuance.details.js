'use strict';

const Validation = require('../yoti_common/validation');

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

    Validation.hasOnlyStringValues(issuingAttributes, 'issuingAttributes');
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
