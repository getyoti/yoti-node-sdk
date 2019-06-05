'use strict';

const constants = require('../yoti_common/constants');
const { BaseProfile } = require('./base.profile');

/**
 * Profile of an application with convenience methods to access well-known attributes.
 *
 * @class ApplicationProfile
 */
class ApplicationProfile extends BaseProfile {
  /**
   * The name of the application.
   *
   * @returns {null|Attribute}
   */
  getName() {
    return this.getAttribute(constants.ATTR_APPLICATION_NAME);
  }

  /**
   * The URL where the application is available at.
   *
   * @returns {null|Attribute}
   */
  getUrl() {
    return this.getAttribute(constants.ATTR_APPLICATION_URL);
  }

  /**
   * The logo of the application that will be displayed to users that perform a share with it.
   *
   * @returns {null|Attribute}
   */
  getLogo() {
    return this.getAttribute(constants.ATTR_APPLICATION_LOGO);
  }

  /**
   * The background colour that will be displayed on each receipt the user gets, as a result
   * of a share with the application.
   *
   * @returns {null|Attribute}
   */
  getReceiptBgColor() {
    return this.getAttribute(constants.ATTR_APPLICATION_RECEIPT_BGCOLOR);
  }
}

module.exports = {
  ApplicationProfile,
};
