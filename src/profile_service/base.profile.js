'use strict';

const { Attribute } = require('../data_type/attribute');
const Validation = require('../yoti_common/validation');

class BaseProfile {
  /**
   * @param {Object<string, Object>|Object[]} profileData
   *   Provide Object[] to support multiple attributes with the same name.
   */
  constructor(profileData) {
    this.attributes = Object
      .keys(Object.assign({}, profileData))
      .filter((key) => profileData[key])
      .map((key) => new Attribute(profileData[key]));

    this.attributesMap = this.attributes.reduce((acc, current) => {
      const name = current.getName();
      acc[name] = acc[name] || [];
      acc[name].push(current);
      return acc;
    }, {});

    // @deprecated 4.0.0
    // Process profile data into Object keyed by attribute name for backwards compatibility.
    this.profileData = this.attributes.reduce((acc, current) => {
      const name = current.getName();
      acc[name] = acc[name] || current;
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
   * Return map of all attributes for the profile.
   *
   * @deprecated 4.0.0 replaced by getAttributesList()
   *
   * @returns {Object.<string, Attribute>}
   */
  getAttributes() {
    return this.profileData;
  }

  /**
   * @param {*} prop
   *
   * @deprecated 4.0.0 No longer in use.
   */
  propertyExists(prop) {
    if (prop && (this.profileData instanceof Object)) {
      return Object.prototype.hasOwnProperty.call(this.profileData, prop);
    }
    return false;
  }

  /**
   * Find attributes starting with provided name.
   *
   * @param {string} name
   *
   * @returns {Array}
   */
  findAttributesStartingWith(name) {
    Validation.isString(name, 'name');

    return this.getAttributesList()
      .filter((attribute) => attribute.getName().startsWith(name));
  }

  /**
   * Returns a string representing the object.
   *
   * @returns {string}
   */
  toString() {
    return JSON.stringify(this.profileData);
  }
}

module.exports = {
  BaseProfile,
};
