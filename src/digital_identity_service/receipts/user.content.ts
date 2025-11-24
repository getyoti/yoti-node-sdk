import BaseContent = require('./base.content');
import UserProfile = require('./user.profile');

class UserContent extends BaseContent {
  /**
   * @param {{ [k: string]: any }[]} attributes
   * @param {{ [k: string]: any }[]} extraData
   */
  constructor(attributes = [], extraData = []) {
    super(extraData);
    /** @private */
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

export default UserContent;
