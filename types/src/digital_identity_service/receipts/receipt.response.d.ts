export = ReceiptResponse;
/**
 * The receipt response
 *
 * @class ReceiptResponse
 */
declare class ReceiptResponse {
    constructor(response: any);
    id: any;
    sessionId: any;
    timestamp: Date;
    error: any;
    rememberMeId: any;
    parentRememberMeId: any;
    content: any;
    otherPartyContent: any;
    wrappedItemKeyId: any;
    wrappedKey: any;
    /**
     * The receipt ID
     *
     * @returns {string} The receipt ID
     */
    getId(): string;
    /**
     * The session ID
     *
     * @returns {string} The session ID
     */
    getSessionId(): string;
    /**
     * The timestamp
     *
     * @returns {Date} The timestamp
     */
    getTimestamp(): Date;
    /**
     * The Remember Me ID
     *
     * @returns {string} The Remember Me ID
     */
    getRememberMeId(): string;
    /**
     * The Parent Remember Me ID
     *
     * @returns {string} The Parent Remember Me ID
     */
    getParentRememberMeId(): string;
    /**
     * The content
     *
     * @returns {Object} The content
     */
    getContent(): any;
    /**
     * The otherPartyContent
     *
     * @returns {Object} The otherPartyContent
     */
    getOtherPartyContent(): any;
    /**
     * The wrappedItemKeyId
     *
     * @returns {string} The wrappedItemKeyId
     */
    getWrappedItemKeyId(): string;
    /**
     * The wrappedKey
     *
     * @returns {string} The wrappedKey
     */
    getWrappedKey(): string;
    /**
     * The error of the receipt
     *
     * @returns {string} The error of the receipt
     */
    getError(): string;
}
