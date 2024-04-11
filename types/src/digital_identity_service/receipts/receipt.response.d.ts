export = ReceiptResponse;
/**
 * The receipt response
 *
 * @class ReceiptResponse
 */
declare class ReceiptResponse {
    constructor(response: any);
    /** @private */
    private id;
    /** @private */
    private sessionId;
    /** @private */
    private timestamp;
    /** @private */
    private error;
    /** @private */
    private errorReason;
    /** @private */
    private rememberMeId;
    /** @private */
    private parentRememberMeId;
    /** @private */
    private content;
    /** @private */
    private otherPartyContent;
    /** @private */
    private wrappedItemKeyId;
    /** @private */
    private wrappedKey;
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
    /**
     * @typedef {Object} ErrorReason
     * @property {RequirementsNotMetDetail[]} [requirementsNotMetDetails]
     *
     * The error reason of the receipt
     *
     * @returns {ErrorReason|undefined}
     */
    getErrorReason(): {
        /**
         * The error reason of the receipt
         */
        requirementsNotMetDetails?: RequirementsNotMetDetail[];
    };
}
declare namespace ReceiptResponse {
    export { RequirementsNotMetDetail };
}
type RequirementsNotMetDetail = {
    failureType?: string;
    documentType?: string;
    documentCountryIsoCode?: string;
    auditId?: string;
    details?: string;
};
