export type Attribute = protobuf.Type;
/**
 * Decode all attributes.
 *
 * @param {Uint8Array} binaryData
 *
 * @returns {{attributes: Attribute[]}}
 */
declare function decodeAttributeList(binaryData: Uint8Array): {
    attributes: protobuf.Type[];
};
declare function encodeAttributeList(attributesData: any): Uint8Array;
export {};
