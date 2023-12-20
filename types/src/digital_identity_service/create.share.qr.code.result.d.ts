export = CreateShareQrCodeResult;
declare class CreateShareQrCodeResult {
    /**
     * @param {Object} response
     */
    constructor(response: any);
    id: any;
    uri: any;
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
