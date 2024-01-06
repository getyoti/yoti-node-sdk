export = ShareSession;
declare class ShareSession {
    /**
     * @param {Policy} policy
     * @param {Extension[]} extensions
     * @param {Object} subject
     * @param {string} redirectUri
     * @param {ShareSessionNotification} notification
     */
    constructor(policy: Policy, extensions: Extension[], subject: any, redirectUri: string, notification: ShareSessionNotification);
    /** @private */
    private policy;
    /** @private */
    private extensions;
    /** @private */
    private redirectUri;
    /** @private */
    private subject;
    /** @private */
    private notification;
    /**
     * @returns {string} The redirect uri.
     */
    getRedirectUri(): string;
    /**
     * @returns {Policy} The customisable Policy to use in the share.
     */
    getPolicy(): Policy;
    /**
     * @returns {Extension[]} List of Extension to be activated for the application.
     */
    getExtensions(): Extension[];
    /**
     * @returns {Object} The subject describing data.
     */
    getSubject(): any;
    /**
     * @returns {Object} The notification configuration.
     */
    getNotification(): any;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
import Policy = require("./policy/policy");
import Extension = require("./extension/extension");
import ShareSessionNotification = require("./share.session.notification");
