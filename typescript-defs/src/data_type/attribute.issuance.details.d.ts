export = AttributeIssuanceDetails;
declare class AttributeIssuanceDetails {
    /**
     * @param {string} token
     * @param {Date|undefined} expiryDate
     * @param {string[]} issuingAttributes
     */
    constructor(token: string, expiryDate: Date | undefined, issuingAttributes?: string[]);
    token: string;
    expiryDate: Date;
    issuingAttributes: string[];
    getToken(): string;
    getExpiryDate(): Date;
    getIssuingAttributes(): string[];
}
