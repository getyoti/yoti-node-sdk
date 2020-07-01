'use strict';

const { Attribute } = require('../data_type/attribute');
const Validation = require('../yoti_common/validation');

class BaseProfile {
  /**
   * @param {object} profileData
   */
  constructor(profileData) {
    this.profileData = Object.assign({}, profileData);
  }

  /**
   * Return Attribute object.
   *
   * @param attrName
   *
   * @returns {null|Attribute}
   */
  getAttribute(attrName) {
    if (this.propertyExists(attrName)) {
      const attrObj = this.profileData[attrName];
      if (attrObj instanceof Object) {
        return new Attribute(attrObj);
      }
    }
    return null;
  }

  /**
   * Return all attributes for the profile.
   *
   * @returns {Object.<string, Attribute>}
   */
  getAttributes() {
    return Object.keys(this.profileData).reduce((acc, current) => {
      acc[current] = this.getAttribute(current);
      return acc;
    }, {});
  }

  /**
   * @param {*} prop
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

    return Object.keys(this.getAttributes())
      .map((key) => this.getAttributes()[key])
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
