export = GetShareReceiptResult;
declare class GetShareReceiptResult {
    /**
     * @param {ReceiptResponse} receiptResponse
     *   Parsed ReceiptResponse.
     * @param {UserContent} userContent
     *   The user content, including profile and extra data
     * @param {ApplicationContent} applicationContent
     *  The application content, including profile and extra data
     */
    constructor(receiptResponse: ReceiptResponse, userContent?: UserContent, applicationContent?: ApplicationContent);
    sessionId: any;
    rememberMeId: any;
    parentRememberMeId: any;
    timestamp: any;
    error: any;
    id: any;
    userContent: UserContent;
    applicationContent: ApplicationContent;
    /**
     * Returns the ID of the Session that the receipt belongs to.
     *
     * @returns {string}
     */
    getSessionId(): string;
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
     * The user profile with shared attributes and anchor information, returned
     * by Yoti if the request was successful.
     *
     * @returns {UserProfile}
     */
    getProfile(): UserProfile;
    /**
     * Extra data associated with the user content
     *
     * @returns {ExtraData}
     */
    getExtraData(): ExtraData;
    /**
     * The user content (profile + extraData)
     *
     * @returns {UserContent}
     */
    getUserContent(): UserContent;
    /**
     * The application content (profile + extraData)
     *
     * @returns {ApplicationContent}
     */
    getApplicationContent(): ApplicationContent;
    /**
     * Error code of receipt
     *
     * @returns {string}
     */
    getError(): string;
}
import UserContent = require("./receipts/user.content");
import ApplicationContent = require("./receipts/application.content");
