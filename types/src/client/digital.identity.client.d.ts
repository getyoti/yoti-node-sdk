export = DigitalIdentityClient;
declare class DigitalIdentityClient {
    /**
     * @param {string} sdkId
     * @param {string|Buffer} pem
     * @param {{apiUrl?: string}} options
     */
    constructor(sdkId: string, pem: string | Buffer, { apiUrl }?: {
        apiUrl?: string;
    });
    /** @private */
    private digitalIdentityService;
    /**
     * @typedef {import('../digital_identity_service/share.session.configuration.js')} ShareSessionConfig
     *
     * @param {ShareSessionConfig} shareSessionConfig
     *
     * @typedef {import('../digital_identity_service/create.share.session.result.js')} CreateShareSessionResult
     *
     * @returns {Promise<CreateShareSessionResult>}
     */
    createShareSession(shareSessionConfig: import("../digital_identity_service/share.session.configuration.js")): Promise<import("../digital_identity_service/create.share.session.result.js")>;
    /**
     * @param {string} sessionId
     *
     * @typedef {import('../digital_identity_service/get.share.session.result.js')} GetShareSessionResult
     *
     * @returns {Promise<GetShareSessionResult>}
     */
    getShareSession(sessionId: string): Promise<import("../digital_identity_service/get.share.session.result.js")>;
    /**
     * @param {string} sessionId
     *
     * @typedef {import('../digital_identity_service/create.share.qr.code.result.js')} CreateShareQrCodeResult
     *
     * @returns {Promise<CreateShareQrCodeResult>}
     */
    createShareQrCode(sessionId: string): Promise<import("../digital_identity_service/create.share.qr.code.result.js")>;
    /**
     * @param {string} qrCodeId
     *
     * @typedef {import('../digital_identity_service/get.share.qr.code.result.js')} GetShareQrCodeResult
     *
     * @returns {Promise<GetShareQrCodeResult>}
     */
    getShareQrCode(qrCodeId: string): Promise<import("../digital_identity_service/get.share.qr.code.result.js")>;
    /**
     * @param {string} receiptId
     *
     * @typedef {import('../digital_identity_service/get.share.receipt.result.js')} GetShareReceiptResult
     *
     * @returns {Promise<GetShareReceiptResult>}
     */
    getShareReceipt(receiptId: string): Promise<import("../digital_identity_service/get.share.receipt.result.js")>;
}
