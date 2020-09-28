'use strict';

const VALIDATION_PATTERN = /^([A-Za-z_]*) ([A-Za-z]{3}) ([A-Za-z0-9]{1}).*$/;
const TYPE_INDEX = 0;
const COUNTRY_INDEX = 1;
const NUMBER_INDEX = 2;
const EXPIRATION_INDEX = 3;
const AUTHORITY_INDEX = 4;

module.exports.DocumentDetails = class DocumentDetails {
  constructor(value) {
    this.parseFromValue(value);
  }

  /**
   * @param {string} value
   *
   * @deprecated value is no longer validated using pattern.
   */
  validateData(value) {
    const regex = new RegExp(VALIDATION_PATTERN);
    if (!regex.test(value)) {
      throw new Error(`Invalid value for ${this.constructor.name}`);
    }
  }

  parseFromValue(value) {
    const parsedValues = value.split(' ');

    if (parsedValues.length < 3 || parsedValues.includes('')) {
      throw new Error('Invalid value for DocumentDetails');
    }

    this.type = parsedValues[TYPE_INDEX];
    this.issuingCountry = parsedValues[COUNTRY_INDEX];
    this.documentNumber = parsedValues[NUMBER_INDEX];

    if (parsedValues.length > EXPIRATION_INDEX) {
      const dateValue = parsedValues[EXPIRATION_INDEX];
      const dateObj = new Date(dateValue);

      if (dateValue !== '-' && Number.isNaN(dateObj.getFullYear())) {
        throw new Error('Invalid Date');
      }
      this.expirationDate = dateValue !== '-' ? dateObj : null;
    }

    if (parsedValues.length > AUTHORITY_INDEX) {
      this.issuingAuthority = parsedValues[AUTHORITY_INDEX];
    }
  }

  /**
   * Type of the document e.g. PASSPORT | DRIVING_LICENCE | NATIONAL_ID | PASS_CARD
   *
   * @returns {string}
   */
  getType() {
    return this.type;
  }

  /**
   * ISO-3166-1 alpha-3 country code, e.g. “GBR“
   *
   * @returns {string}
   */
  getIssuingCountry() {
    return this.issuingCountry;
  }

  /**
   * Document number (may include letters) from the document.
   *
   * @returns {string}
   */
  getDocumentNumber() {
    return this.documentNumber;
  }

  /**
   * Expiration date of the document in Date format. If the document does not expire, this
   * field will not be present. The time part of this Date will default to 00:00:00.
   *
   * @returns {Date|null|undefined}
   */
  getExpirationDate() {
    return this.expirationDate;
  }

  /**
   * Can either be a country code (for a state), or the name of the issuing authority.
   *
   * @returns {string|undefined}
   */
  getIssuingAuthority() {
    return this.issuingAuthority;
  }
};
