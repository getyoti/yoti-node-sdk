export = ShareSessionNotification;
declare class ShareSessionNotification {
    /**
     * @param {string} url
     * @param {string} method
     * @param {Object} headers
     * @param {boolean} verifyTls
     */
    constructor(url: string, method: string, headers: any, verifyTls: boolean);
    /** @private */
    private url;
    /** @private */
    private method;
    /** @private */
    private headers;
    /** @private */
    private verifyTls;
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
    /**
     * Returns serialized data for JSON.stringify()
     */
    toJSON(): {
        url: string;
        method: string;
        headers: any;
        verifyTls: true;
    };
}
