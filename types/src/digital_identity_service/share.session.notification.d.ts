export = ShareSessionNotification;
declare class ShareSessionNotification {
    /**
     * @param {string} url
     * @param {string} method
     * @param {Object} headers
     * @param {boolean} verifyTls
     */
    constructor(url: string, method: string, headers: any, verifyTls: boolean);
    url: string;
    method: string;
    headers: any;
    verifyTls: true;
    /**
     * @returns {string} The notification url.
     */
    getUrl(): string;
    /**
     * @returns {string} The notification method.
     */
    getMethod(): string;
    /**
     * @returns {Object} The notification headers.
     */
    getHeaders(): any;
    /**
     * @returns {boolean} The notification verifyTls option.
     */
    getVerifyTls(): boolean;
    toJSON(): {
        url: string;
        method: string;
        headers: any;
        verifyTls: true;
    };
}
