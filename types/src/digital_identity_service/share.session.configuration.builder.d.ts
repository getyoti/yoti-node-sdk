export = ShareSessionBuilder;
declare class ShareSessionBuilder {
    extensions: any[];
    /**
     * @param {Object} subject
     */
    withSubject(subject: any): this;
    subject: any;
    /**
     * @param {Policy} policy
     */
    withPolicy(policy: Policy): this;
    policy: import("./policy/policy");
    /**
     * @param {string} redirectUri
     */
    withRedirectUri(redirectUri: string): this;
    redirectUri: string;
    /**
     * @param {Extension} extension
     */
    withExtension(extension: Extension): this;
    /**
     * @param {ShareSessionNotification} notification
     */
    withNotification(notification: ShareSessionNotification): this;
    notification: import("./share.session.notification");
    /**
     * @returns {ShareSessionConfiguration}
     */
    build(): ShareSessionConfiguration;
}
declare namespace ShareSessionBuilder {
    export { Policy, ShareSessionNotification, Extension };
}
import ShareSessionConfiguration = require("./share.session.configuration");
type Policy = import('./policy/policy');
type ShareSessionNotification = import('./share.session.notification');
type Extension = import('./extension/extension');
