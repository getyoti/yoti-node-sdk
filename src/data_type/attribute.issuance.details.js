'use strict';

const Validation = require('../yoti_common/validation');
const AttributeDefinition = require('./attribute.definition');

class AttributeIssuanceDetails {
  /**
   * @param {string} token
   * @param {Date} [expiryDate]
   * @param {AttributeDefinition[]} [issuingAttributes]
   */
  constructor(token, expiryDate, issuingAttributes = []) {
    Validation.isString(token, 'token');
    /** @private */
    this.token = token;

    if (expiryDate !== undefined) {
      Validation.instanceOf(expiryDate, Date, 'expiryDate');
    }
    /** @private */
    this.expiryDate = expiryDate;

    Validation.isArrayOfType(issuingAttributes, AttributeDefinition, 'issuingAttributes');
    /** @private */
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
