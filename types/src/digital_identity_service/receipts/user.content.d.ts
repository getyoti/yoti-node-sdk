export = UserContent;
declare class UserContent extends BaseContent {
    /**
     * @param {{ [k: string]: any }[]} attributes
     * @param {{ [k: string]: any }[]} extraData
     */
    constructor(attributes?: {
        [k: string]: any;
    }[], extraData?: {
        [k: string]: any;
    }[]);
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
