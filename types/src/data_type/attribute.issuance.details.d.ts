export = AttributeIssuanceDetails;
declare class AttributeIssuanceDetails {
    /**
     * @param {string} token
     * @param {Date|undefined} expiryDate
     * @param {string[]} issuingAttributes
     */
    constructor(token: string, expiryDate: Date | undefined, issuingAttributes?: string[]);
    /** @private */
    private token;
    /** @private */
    private expiryDate;
    /** @private */
    private issuingAttributes;
    getToken(): string;
    getExpiryDate(): Date;
    getIssuingAttributes(): string[];
}
