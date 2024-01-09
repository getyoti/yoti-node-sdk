export type Attribute = protobuf.Type;
export type Message = import('protobufjs').Message;
/**
 * Decode all attributes.
 *
 * @param {Buffer} binaryData
 *
 * @returns {{attributes: Attribute[]}}
 */
declare function decodeAttributeList(binaryData: Buffer): {
    attributes: protobuf.Type[];
};
declare function encodeAttributeList(attributesData: any): Uint8Array;
export {};
