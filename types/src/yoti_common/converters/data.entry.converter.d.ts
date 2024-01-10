export = DataEntryConverter;
/**
 * @typedef {import('./../../data_type/attribute.issuance.details')} AttributeIssuanceDetails
 */
declare class DataEntryConverter {
    /**
     * @param type
     * @param value
     * @returns {AttributeIssuanceDetails|undefined}
     */
    static convertValue(type: any, value: any): AttributeIssuanceDetails | undefined;
}
declare namespace DataEntryConverter {
    export { AttributeIssuanceDetails };
}
type AttributeIssuanceDetails = import('./../../data_type/attribute.issuance.details');
