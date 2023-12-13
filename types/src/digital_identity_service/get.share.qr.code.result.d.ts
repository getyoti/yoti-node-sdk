export = GetShareQrCodeResult;
declare class GetShareQrCodeResult {
    /**
     * @param {Object} response
     */
    constructor(response: any);
    id: any;
    expiry: Date;
    sessionId: any;
    redirectUri: any;
    /**
     * The QR code ID
     *
     * @returns {string} The QR code ID
     */
    getId(): string;
    /**
     * The expiry
     *
     * @returns {Date} The expiry
     */
    getExpiry(): Date;
    /**
     * The session ID
     *
     * @returns {string} The session ID
     */
    getSessionId(): string;
    /**
     * The redirect uri
     *
     * @returns {string} The redirect uri
     */
    getRedirectUri(): string;
}
