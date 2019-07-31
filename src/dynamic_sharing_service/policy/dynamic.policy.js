'use strict';

const WantedAttribute = require('./wanted.attribute');
const Validation = require('../../yoti_common/validation');

/**
 * Defines the list of wanted attributes.
 *
 * @class DynamicPolicy
 */
module.exports = class DynamicPolicy {
  /**
   * @param {WantedAttribute[]} wantedAttributes - array of attributes to be requested.
   * @param {integer[]} wantedAuthTypes - auth types represents the authentication type to be used.
   * @param {boolean} wantedRememberMe
   */
  constructor(
    wantedAttributes,
    wantedAuthTypes,
    wantedRememberMe = false
  ) {
    Validation.isArrayOfType(wantedAttributes, WantedAttribute, 'wantedAttribute');
    this.wantedAttributes = wantedAttributes;

    if (wantedAuthTypes) {
      Validation.isArrayOfIntegers(wantedAuthTypes, 'wantedAuthTypes');
      this.wantedAuthTypes = wantedAuthTypes;
    } else {
      this.wantedAuthTypes = [];
    }

    Validation.isBoolean(wantedRememberMe, 'wantedRememberMe');
    this.wantedRememberMe = wantedRememberMe;
  }

  /**
   * @returns {WantedAttribute[]} array of attributes to be requested.
   */
  getWantedAttributes() {
    return this.wantedAttributes;
  }

  /**
   * @returns {integer[]} auth types represents the authentication type to be used.
   */
  getWantedAuthTypes() {
    return this.wantedAuthTypes;
  }

  /**
   * @returns {boolean}
   */
  getWantedRememberMe() {
    return this.wantedRememberMe;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      wanted: this.getWantedAttributes(),
      wanted_auth_types: this.getWantedAuthTypes(),
      wanted_remember_me: this.getWantedRememberMe(),
      wanted_remember_me_optional: false,
    };
  }
};
