/**
 * Details of an activity between a user and the application.
 *
 * @class ActivityDetails
 */
export class ActivityDetails {
    /**
     * @param {object} parsedResponse
     *   Parsed JSON response.
     * @param {array} decryptedProfile
     *   Decrypted user profile data.
     * @param {array} decryptedApplicationProfile
     *   Decrypted application profile data.
     * @param {ExtraData} extraData
     *   Decrypted and converted extra data.
     */
    constructor(parsedResponse: object, decryptedProfile: any[], decryptedApplicationProfile: any[], extraData: ExtraData);
    parsedResponse: any;
    decryptedProfile: any[];
    receipt: any;
    profile: any;
    extraData: ExtraData;
    extendedProfile: Profile;
    applicationProfile: ApplicationProfile;
    /**
     * Return the Remember Me ID.
     *
     * @deprecated Replaced by getRememberMeId()
     */
    getUserId(): string;
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
     * The user profile returned by Yoti if the request was successful.
     *
     * @deprecated replaced by getProfile()
     *
     * @returns {Object}
     */
    getUserProfile(): any;
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
     * A enum to represent the success state when requesting a profile.
     *
     * @returns {string}
     */
    getOutcome(): string;
    /**
     * Base64 encoded selfie image.
     *
     * @returns {string}
     */
    getBase64SelfieUri(): string;
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
import ExtraData = require("./extra.data");
import { Profile } from "./profile";
import { ApplicationProfile } from "./application.profile";
