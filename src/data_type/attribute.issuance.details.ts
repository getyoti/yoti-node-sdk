import Validation = require('../yoti_common/validation');
import AttributeDefinition = require('./attribute.definition');

class AttributeIssuanceDetails {
  private token: string;
  private expiryDate?: Date;
  private issuingAttributes: any[];

  /**
   * @param {string} token
   * @param {Date} [expiryDate]
   * @param {AttributeDefinition[]} [issuingAttributes]
   */
  constructor(token: string, expiryDate?: Date, issuingAttributes: any[] = []) {
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

export = AttributeIssuanceDetails;
