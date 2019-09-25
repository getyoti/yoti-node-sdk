'use strict';

const AGE_PATTERN = /^age(Under|Over):[1-9][0-9]*$/;

/**
 * @deprecated replaced by AgeVerification
 */
module.exports.Age = class Age {
  constructor(profileData) {
    this.profileData = profileData;
    this.attrValue = null;
  }

  /**
   * Returns a boolean representing the attribute value
   * or null if the attribute is not set in the Yoti Hub
   *
   * @returns {*}
   */
  isVerified() {
    this.extractAgeValue();
    if (this.attrValue) {
      return this.attrValue === 'true';
    }
    return null;
  }

  extractAgeValue() {
    const regex = new RegExp(AGE_PATTERN);
    if (!(this.profileData instanceof Object)) {
      return;
    }
    const profile = this.profileData;
    Object.keys(profile).forEach((key) => {
      if (!this.attrValue && regex.exec(key) !== null) {
        this.attrValue = profile[key];
      }
    }, this);
  }

  static conditionVerified(attrName) {
    const regex = new RegExp(AGE_PATTERN);
    return regex.exec(attrName) !== null;
  }
};
