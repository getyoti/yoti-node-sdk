'use strict';

const WantedAttribute = require('./wanted.attribute');
const Validation = require('../../yoti_common/validation');

module.exports = class DynamicPolicy {
  /**
   * @param {WantedAttribute[]} wantedAttributes - wanted is an array of attributes to be requested.
   * @param {integer[]} wantedAuthTypes - auth types represents the authentication type to be used.
   * @param {boolean} wantedRememberMe
   * @param {boolean} wantedRememberMeOptional
   */
  constructor(
    wantedAttributes,
    wantedAuthTypes,
    wantedRememberMe = false,
    wantedRememberMeOptional = false
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
    this.wantedRememberMeId = wantedRememberMe;

    Validation.isBoolean(wantedRememberMeOptional, 'wantedRememberMeOptional');
    this.wantedRememberMeOptional = wantedRememberMeOptional;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      wanted: this.wantedAttributes,
      wanted_auth_types: this.wantedAuthTypes,
      wanted_remember_me: this.wantedRememberMeId,
      wanted_remember_me_optional: this.wantedRememberMeOptional,
    };
  }
};
