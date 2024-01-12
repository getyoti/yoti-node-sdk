export = CreateShareQrCodeResult;
declare class CreateShareQrCodeResult {
    /**
     * @param {Object} response
     */
    constructor(response: any);
    /** @private */
    private id;
    /** @private */
    private uri;
    /**
     * The QR code ID
     *
     * @returns {string} The QR code ID
     */
    getId(): string;
    /**
     * The URI
     *
     * @returns {string} The URI
     */
    getUri(): string;
}
