'use strict';

class ThirdPartyAttributeExtensionContent {
  constructor(expiryDate, definitions) {
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
      definitions: this.definitions,
    };
  }
}

module.exports = ThirdPartyAttributeExtensionContent;
