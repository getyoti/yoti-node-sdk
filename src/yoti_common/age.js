'use strict';

module.exports.Age = class Age {
  constructor(profileData) {
    this.profileData = profileData;
    this.pattern = 'age(Under|Over):[1-9][0-9]';
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
    const regex = new RegExp(this.pattern);
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
};
