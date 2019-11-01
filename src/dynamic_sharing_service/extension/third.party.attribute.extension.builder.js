'use strict';

const Extension = require('./extension');
const ThirdPartyAttributeExtensionContent = require('./third.party.attribute.extension.content');
const AttributeDefinition = require('../attribute.definition');
const Validation = require('../../yoti_common/validation');

const THIRD_PARTY_ATTRIBUTE_EXTENSION_TYPE = 'THIRD_PARTY_ATTRIBUTE';

class ThirdPartyAttributeExtensionBuilder {
  constructor() {
    this.definitions = [];
  }

  withExpiryDate(expiryDate) {
    Validation.instanceOf(expiryDate, Date, 'expiryDate');
    this.expiryDate = expiryDate;
    return this;
  }

  withDefinition(definition) {
    Validation.instanceOf(definition, AttributeDefinition, 'definition');
    this.definitions.push(definition);
    return this;
  }

  withDefinitions(definitions) {
    Validation.isArrayOfType(definitions, AttributeDefinition, 'definitions');
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
