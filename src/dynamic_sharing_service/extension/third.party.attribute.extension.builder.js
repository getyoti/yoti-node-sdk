'use strict';

const Extension = require('./extension');
const ThirdPartyAttributeExtensionContent = require('./third.party.attribute.extension.content');
const AttributeDefinition = require('../../data_type/attribute.definition');
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
    Validation.isString(definition, 'definition');
    this.definitions.push(new AttributeDefinition(definition));
    return this;
  }

  withDefinitions(definitions) {
    Validation.hasOnlyStringValues(definitions, 'definitions');
    this.definitions = definitions.map((def) => new AttributeDefinition(def));
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
