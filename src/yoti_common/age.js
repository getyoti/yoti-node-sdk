'use strict';

const AGE_PATTERN = 'age(Under|Over):[1-9][0-9]';

module.exports.Age = class Age {
  constructor(profileData) {
    this.profileData = profileData;
    this.attrValue = null;
  }

  /**
   * Returns a boolean representing the attribute value
   * Or null if the attribute is not set in the dashboard
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
    if (regex.exec(attrName) !== null) {
      return true;
    }
    return false;
  }
};
