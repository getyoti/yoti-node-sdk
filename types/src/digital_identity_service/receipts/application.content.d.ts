export = ApplicationContent;
declare class ApplicationContent extends BaseContent {
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
     * @returns {ApplicationProfile}
     */
    getProfile(): ApplicationProfile;
}
import BaseContent = require("./base.content");
import ApplicationProfile = require("./application.profile");
