'use strict';

/**
 * Defines third party attribute extension content.
 *
 * @class ThirdPartyAttributeExtensionContent
 */
class ThirdPartyAttributeExtensionContent {
  constructor(expiryDate, definitions) {
    /** @private */
    this.expiryDate = expiryDate;
    /** @private */
    this.definitions = definitions;
  }

  getExpiryDate() {
    return this.expiryDate;
  }

  getDefinitions() {
    return this.definitions;
  }

  /**
   * Returns serialized data for JSON.stringify()
   */
  toJSON() {
    return {
      expiry_date: this.expiryDate.toISOString(),
      definitions: this.definitions,
    };
  }
}

module.exports = ThirdPartyAttributeExtensionContent;
