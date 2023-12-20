export = ApplicationContent;
declare class ApplicationContent extends BaseContent {
    /**
     * @param {[]} attributes
     * @param {[]} extraData
     */
    constructor(attributes?: [], extraData?: []);
    profile: ApplicationProfile;
    /**
     * Get the user profile
     * @returns {ApplicationProfile}
     */
    getProfile(): ApplicationProfile;
}
import BaseContent = require("./base.content");
import ApplicationProfile = require("./application.profile");
