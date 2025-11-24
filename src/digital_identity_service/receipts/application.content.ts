import BaseContent = require('./base.content');
import ApplicationProfile = require('./application.profile');

class ApplicationContent extends BaseContent {
  /**
   * @param {{ [k: string]: any }[]} attributes
   * @param {{ [k: string]: any }[]} extraData
   */
  constructor(attributes = [], extraData = []) {
    super(extraData);
    /** @private */
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

export default ApplicationContent;
