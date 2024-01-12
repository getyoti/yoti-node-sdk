export = AttributeIssuanceDetails;
declare class AttributeIssuanceDetails {
    /**
     * @param {string} token
     * @param {Date} [expiryDate]
     * @param {AttributeDefinition[]} [issuingAttributes]
     */
    constructor(token: string, expiryDate?: Date, issuingAttributes?: AttributeDefinition[]);
    /** @private */
    private token;
    /** @private */
    private expiryDate;
    /** @private */
    private issuingAttributes;
    getToken(): string;
    getExpiryDate(): Date;
    getIssuingAttributes(): AttributeDefinition[];
}
import AttributeDefinition = require("./attribute.definition");
