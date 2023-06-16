'use strict';

const BaseContent = require('./base.content');
const UserProfile = require('./user.profile');

class UserContent extends BaseContent {
  /**
   * @param {[]} attributes
   * @param {[]} extraData
   */
  constructor(attributes = [], extraData = []) {
    super(extraData);
    this.profile = new UserProfile(attributes);
  }

  /**
   * Get the user profile
   * @returns {UserProfile}
   */
  getProfile() {
    return this.profile;
  }
}

module.exports = UserContent;
