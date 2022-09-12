'use strict';

const { Attribute } = require('../data_type/attribute');

class BaseProfile {
  /**
   * @param {Array} attributes
   */
  constructor(attributes = []) {
    this.attributes = attributes
      .filter((attribute) => !!attribute)
      .map((attribute) => new Attribute(attribute));

    this.attributesMap = this.attributes.reduce((acc, current) => {
      const name = current.getName();
      acc[name] = acc[name] || [];
      acc[name].push(current);
      return acc;
    }, {});
  }

  /**
   * Return Attribute object.
   *
   * @param attrName
   *
   * @returns {Attribute|null}
   */
  getAttribute(attrName) {
    const attributes = this.getAttributesByName(attrName);
    if ((attributes instanceof Array) && attributes.length > 0) {
      return attributes[0];
    }
    return null;
  }

  /**
   * Return list of all Attribute objects for provided attribute name.
   *
   * @param attrName
   *
   * @returns {Attribute[]}
   */
  getAttributesByName(attrName) {
    return this.attributesMap[attrName] || [];
  }

  /**
   * Return first attribute found by id.
   *
   * @param attrId
   *
   * @returns {Attribute}
   */
  getAttributeById(attrId) {
    return this.attributes.find((attr) => attr.getId() === attrId);
  }

  /**
   * Return array of all attributes for the profile.
   *
   * @returns {Attribute[]}
   */
  getAttributesList() {
    return this.attributes;
  }

  /**
   * Returns a string representing the object.
   *
   * @returns {string}
   */
  toString() {
    return JSON.stringify(this.attributes);
  }
}

module.exports = {
  BaseProfile,
};
