export = ExtraData;
declare class ExtraData {
    /**
     * @param {Object[]} dataEntries
     */
    constructor(dataEntries?: any[]);
    attributeIssuanceDetails: any;
    /**
     * @returns {AttributeIssuanceDetails}
     */
    getAttributeIssuanceDetails(): AttributeIssuanceDetails;
}
import AttributeIssuanceDetails = require("../data_type/attribute.issuance.details");
