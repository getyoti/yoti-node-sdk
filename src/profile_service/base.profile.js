'use strict';

const { Attribute } = require('../data_type/attribute');

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
   * @returns {Attribute[]}
   */
  getAttributes() {
    return Object.keys(this.profileData).reduce((attributes, attrName) => {
      attributes.push(this.getAttribute(attrName));
      return attributes;
    }, []);
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
