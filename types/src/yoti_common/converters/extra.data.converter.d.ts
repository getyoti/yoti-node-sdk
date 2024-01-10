export = ExtraDataConverter;
/**
 * @typedef {import('./../../data_type/attribute.issuance.details')} AttributeIssuanceDetails
 */
declare class ExtraDataConverter {
    /**
     * @param {Buffer} extraDataBytes
     * @returns {(AttributeIssuanceDetails|undefined)[]|undefined}
     */
    static convertExtraData(extraDataBytes: Buffer): (AttributeIssuanceDetails | undefined)[] | undefined;
}
declare namespace ExtraDataConverter {
    export { AttributeIssuanceDetails };
}
type AttributeIssuanceDetails = import('./../../data_type/attribute.issuance.details');
