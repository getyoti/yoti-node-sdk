export = ReceiptItemKeyResponse;
/**
 * The receipt item key response
 *
 * @class ReceiptItemKeyResponse
 */
declare class ReceiptItemKeyResponse {
    constructor(response: any);
    id: any;
    iv: any;
    value: any;
    /**
     * The Receipt Item Key ID
     *
     * @returns {string} The Receipt Item Key ID
     */
    getId(): string;
    /**
     * The Receipt Item Key iv
     *
     * @returns {string} The Receipt Item Key iv
     */
    getIv(): string;
    /**
     * The encrypted Receipt Item Key
     *
     * @returns {string} The encrypted Receipt Item Key
     */
    getValue(): string;
}
