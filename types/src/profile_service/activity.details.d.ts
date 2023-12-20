/**
 * Details of an activity between a user and the application.
 *
 * @class ActivityDetails
 */
export class ActivityDetails {
    /**
     * @param {object} parsedResponse
     *   Parsed JSON response.
     * @param {{attributes: Object[]}} userProfile
     *   Decrypted user profile data.
     * @param {{attributes: Object[]}} applicationProfile
     *   Decrypted application profile data.
     * @param {[]} extraData
     *   Decrypted and converted extra data.
     */
    constructor(parsedResponse: object, userProfile: {
        attributes: any[];
    }, applicationProfile: {
        attributes: any[];
    }, extraData: []);
    parsedResponse: any;
    receipt: any;
    userProfile: Profile;
    applicationProfile: ApplicationProfile;
    extraData: ExtraData;
    /**
     * Return the Remember Me ID, which is a unique, stable identifier for
     * a user in the context of an application.
     *
     * You can use it to identify returning users. This value will be different
     * for the same user in different applications.
     *
     * @returns {string}
     */
    getRememberMeId(): string;
    /**
     * Return the Parent Remember Me ID, which is a unique, stable identifier for a
     * user in the context of an organisation.
     *
     * You can use it to identify returning users. This value is consistent for a
     * given user across different applications belonging to a single organisation.
     *
     * @returns {string}
     */
    getParentRememberMeId(): string;
    /**
     * The user profile with shared attributes and anchor information, returned
     * by Yoti if the request was successful.
     *
     * @returns {Profile}
     */
    getProfile(): Profile;
    /**
     * Profile of an application, with convenience methods to access well-known attributes.
     *
     * @returns {ApplicationProfile}
     */
    getApplicationProfile(): ApplicationProfile;
    /**
     * An enum to represent the success state when requesting a profile.
     *
     * @returns {string}
     */
    getOutcome(): string;
    getErrorDetails(): {
        errorCode: any;
        description: any;
    };
    /**
     * Receipt ID identifying a completed activity.
     *
     * @returns {string}
     */
    getReceiptId(): string;
    /**
     * Time and date of the sharing activity
     *
     * @returns {Date}
     */
    getTimestamp(): Date;
    /**
     * Extra data associated with the receipt
     *
     * @returns {ExtraData}
     */
    getExtraData(): ExtraData;
}
import { Profile } from "./profile";
import { ApplicationProfile } from "./application.profile";
import ExtraData = require("./extra.data");
