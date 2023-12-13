export = CreateShareSessionResult;
declare class CreateShareSessionResult {
    /**
     * @param {Object} response
     */
    constructor(response: any);
    id: any;
    status: any;
    expiry: Date;
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
