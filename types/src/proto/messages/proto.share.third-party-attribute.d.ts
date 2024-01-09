export type Message = import('protobufjs').Message;
/**
 * @typedef {{expiryDate:string,definitions:{name:string}[]}} IssuingAttributes
 *
 * @returns {Message<{issuanceToken:Buffer, issuingAttributes: IssuingAttributes[]}>}
 */
declare function decodeThirdPartyAttribute(binaryData: any): any;
export {};
