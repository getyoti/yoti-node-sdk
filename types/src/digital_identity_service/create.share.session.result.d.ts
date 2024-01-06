export = CreateShareSessionResult;
declare class CreateShareSessionResult {
    /**
     * @param {Object} response
     */
    constructor(response: any);
    /** @private */
    private id;
    /** @private */
    private status;
    /** @private */
    private expiry;
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
}
