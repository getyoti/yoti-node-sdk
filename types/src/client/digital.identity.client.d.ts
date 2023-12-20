export = DigitalIdentityClient;
declare class DigitalIdentityClient {
    /**
     * @param {string} sdkId
     * @param {string|Buffer} pem
     * @param {Object} options
     * @param {string} options.apiUrl
     */
    constructor(sdkId: string, pem: string | Buffer, { apiUrl }?: {
        apiUrl: string;
    });
    digitalIdentityService: {
        sdkId: any;
        pem: any;
        apiUrl: string;
        createShareSession(shareSessionConfig: any): Promise<import("../digital_identity_service/create.share.session.result")>;
        getShareSession(sessionId: any): Promise<import("../digital_identity_service/get.share.session.result")>;
        createShareQrCode(sessionId: any): Promise<import("../digital_identity_service/create.share.qr.code.result")>;
        getShareQrCode(qrCodeId: any): Promise<import("../digital_identity_service/get.share.qr.code.result")>;
        fetchReceipt(receiptId: string): Promise<import("../digital_identity_service/receipts/receipt.response")>;
        fetchReceiptItemKey(receiptItemKeyId: string): Promise<import("../digital_identity_service/receipts/receipt.item.key.response")>;
        getShareReceipt(receiptId: string): Promise<import("../digital_identity_service/get.share.receipt.result")>;
    };
    /**
     *
     * @param shareSessionConfig
     * @returns {Promise<CreateShareSessionResult>}
     */
    createShareSession(shareSessionConfig: any): Promise<CreateShareSessionResult>;
    /**
     *
     * @param sessionId
     * @returns {Promise<GetShareSessionResult>}
     */
    getShareSession(sessionId: any): Promise<GetShareSessionResult>;
    /**
     *
     * @param sessionId
     * @returns {Promise<CreateShareQrCodeResult>}
     */
    createShareQrCode(sessionId: any): Promise<CreateShareQrCodeResult>;
    /**
     *
     * @param qrCodeId
     * @returns {Promise<GetShareQrCodeResult>}
     */
    getShareQrCode(qrCodeId: any): Promise<GetShareQrCodeResult>;
    /**
     *
     * @param {string} receiptId
     * @returns {Promise<GetShareReceiptResult>}
     */
    getShareReceipt(receiptId: string): Promise<GetShareReceiptResult>;
}
