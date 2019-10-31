'use strict';

const Extension = require('./extension');
const ThirdPartyAttributeExtensionContent = require('./third.party.attribute.extension.content');

const THIRD_PARTY_ATTRIBUTE_EXTENSION_TYPE = 'THIRD_PARTY_ATTRIBUTE';

class ThirdPartyAttributeExtensionBuilder {
  constructor() {
    this.definitions = [];
  }

  withExpiryDate(expiryDate) {
    this.expiryDate = expiryDate;
    return this;
  }

  withDefinition(definition) {
    this.definitions.push(definition);
    return this;
  }

  withDefinitions(definitions) {
    this.definitions = definitions;
    return this;
  }

  build() {
    const content = new ThirdPartyAttributeExtensionContent(
      this.expiryDate,
      this.definitions
    );
    return new Extension(THIRD_PARTY_ATTRIBUTE_EXTENSION_TYPE, content);
  }
}

module.exports = ThirdPartyAttributeExtensionBuilder;
