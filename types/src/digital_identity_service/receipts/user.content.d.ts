export = UserContent;
declare class UserContent extends BaseContent {
    /**
     * @param {[]} attributes
     * @param {[]} extraData
     */
    constructor(attributes?: [], extraData?: []);
    /** @private */
    private profile;
    /**
     * Get the user profile
     * @returns {UserProfile}
     */
    getProfile(): UserProfile;
}
import BaseContent = require("./base.content");
import UserProfile = require("./user.profile");
