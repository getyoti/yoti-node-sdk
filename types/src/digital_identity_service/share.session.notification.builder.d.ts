export = ShareSessionNotificationBuilder;
declare class ShareSessionNotificationBuilder {
    /** @private */
    private headers;
    /**
     * @param {string} url
     */
    withUrl(url: string): this;
    url: string;
    /**
     * @param {string} method
     */
    withMethod(method: string): this;
    method: string;
    /**
     * @param {string} headerName
     * @param {string} value
     */
    withHeader(headerName: string, value: string): this;
    /**
     * @param {boolean} verifyTls
     */
    withVerifiedTls(verifyTls: boolean): this;
    verifyTls: boolean;
    build(): ShareSessionNotification;
}
import ShareSessionNotification = require("./share.session.notification");
