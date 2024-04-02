export = GetShareReceiptResult;
declare class GetShareReceiptResult {
    /**
     * @param {import ('./receipts/receipt.response')} receiptResponse
     *   Parsed ReceiptResponse.
     * @param {UserContent} userContent
     *   The user content, including profile and extra data
     * @param {ApplicationContent} applicationContent
     *  The application content, including profile and extra data
     */
    constructor(receiptResponse: import('./receipts/receipt.response'), userContent?: UserContent, applicationContent?: ApplicationContent);
    /** @private */
    private sessionId;
    /** @private */
    private rememberMeId;
    /** @private */
    private parentRememberMeId;
    /** @private */
    private timestamp;
    /** @private */
    private error;
    /** @private */
    private errorReason;
    /** @private */
    private id;
    /** @private */
    private userContent;
    /** @private */
    private applicationContent;
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
     * @returns {import('./receipts/user.profile')}
     */
    getProfile(): import('./receipts/user.profile');
    /**
     * Extra data associated with the user content
     *
     * @typedef {import('./receipts/extra.data')} ExtraData
     * @returns {ExtraData}
     */
    getExtraData(): import("./receipts/extra.data");
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
    /**
     * @typedef {import('./receipts/receipt.response').RequirementsNotMetDetail} RequirementsNotMetDetail
     *
     * Error reason of receipt
     *
     * @returns {{requirementsNotMetDetails: RequirementsNotMetDetail[]}}
     */
    getErrorReason(): {
        requirementsNotMetDetails: import("./receipts/receipt.response").RequirementsNotMetDetail[];
    };
}
import UserContent = require("./receipts/user.content");
import ApplicationContent = require("./receipts/application.content");
