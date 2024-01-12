export = GetShareSessionResult;
declare class GetShareSessionResult {
    /**
     * @param {Object} response
     */
    constructor(response: any);
    /** @private */
    private id;
    /** @private */
    private status;
    /** @private */
    private created;
    /** @private */
    private updated;
    /** @private */
    private expiry;
    /** @private */
    private scannedQrCodeId;
    /** @private */
    private receiptId;
    /**
     * The share id
     *
     * @returns {string} The share id
     */
    getId(): string;
    /**
     * The session status
     *
     * @returns {string} The session status
     */
    getStatus(): string;
    /**
     * The session expiry date
     *
     * @returns {Date} The session expiry date
     */
    getExpiry(): Date;
    /**
     * The session updated date
     *
     * @returns {Date} The session updated date
     */
    getUpdated(): Date;
    /**
     * The session created date
     *
     * @returns {Date} The session created date
     */
    getCreated(): Date;
    /**
     * The session qr code id
     *
     * @returns {string} The session qr code id
     */
    getScannedQrCodeId(): string;
    /**
     * The session receipt id
     *
     * @returns {string} The session receipt id
     */
    getReceiptId(): string;
}
