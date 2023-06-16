'use strict';

const BaseContent = require('./base.content');
const ApplicationProfile = require('./application.profile');

class ApplicationContent extends BaseContent {
  /**
   * @param {[]} attributes
   * @param {[]} extraData
   */
  constructor(attributes = [], extraData = []) {
    super(extraData);
    this.profile = new ApplicationProfile(attributes);
  }

  /**
   * Get the user profile
   * @returns {ApplicationProfile}
   */
  getProfile() {
    return this.profile;
  }
}

module.exports = ApplicationContent;
