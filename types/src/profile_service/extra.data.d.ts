export = ExtraData;
declare class ExtraData {
    /**
     * @param {Object[]} dataEntries
     */
    constructor(dataEntries?: any[]);
    /** @private */
    private attributeIssuanceDetails;
    /**
     * @returns {AttributeIssuanceDetails}
     */
    getAttributeIssuanceDetails(): AttributeIssuanceDetails;
}
import AttributeIssuanceDetails = require("../data_type/attribute.issuance.details");
