'use strict';

const Validation = require('../../yoti_common/validation');

class ThirdPartyAttributeExtensionContent {
  constructor(expiryDate, definitions) {
    Validation.instanceOf(expiryDate, Date, 'expiryDate');
    Validation.hasOnlyStringValues(definitions, 'definitions');

    this.expiryDate = expiryDate;
    this.definitions = definitions;
  }

  getExpiryDate() {
    return this.expiryDate;
  }

  getDefinitions() {
    return this.definitions;
  }

  toJSON() {
    return {
      expiry_date: this.expiryDate.toISOString(),
      definitions: this.definitions.map(i => ({ name: i })),
    };
  }
}

module.exports = ThirdPartyAttributeExtensionContent;
