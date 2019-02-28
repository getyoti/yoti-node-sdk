'use strict';

const VALIDATION_PATTERN = /^([A-Za-z_]*) ([A-Za-z]{3}) ([A-Za-z0-9]{1}).*$/;
const TYPE_INDEX = 0;
const COUNTRY_INDEX = 1;
const NUMBER_INDEX = 2;
const EXPIRATION_INDEX = 3;
const AUTHORITY_INDEX = 4;

module.exports.DocumentDetails = class DocumentDetails {
  constructor(value) {
    this.validateData(value);
    this.parseFromValue(value);
  }

  validateData(value) {
    const regex = new RegExp(VALIDATION_PATTERN);
    if (!regex.test(value)) {
      throw new Error(`Invalid value for ${this.constructor.name}`);
    }
  }

  parseFromValue(value) {
    this.validateData(value);
    const parsedValues = value.split(' ');

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

  getType() {
    return this.type;
  }

  getIssuingCountry() {
    return this.issuingCountry;
  }

  getDocumentNumber() {
    return this.documentNumber;
  }

  getExpirationDate() {
    return this.expirationDate;
  }
};
