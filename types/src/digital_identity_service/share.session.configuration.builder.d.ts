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
    policy: Policy;
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
    notification: ShareSessionNotification;
    /**
     * @returns {ShareSession}
     */
    build(): ShareSession;
}
