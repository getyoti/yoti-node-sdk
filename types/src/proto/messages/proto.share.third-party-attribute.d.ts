export type Message = import('protobufjs').Message;
/**
 * @typedef {{expiryDate:string,definitions:{name:string}[]}} IssuingAttributes
 *
 * @returns {{issuanceToken:Buffer, issuingAttributes: IssuingAttributes[]}}
 */
declare function decodeThirdPartyAttribute(binaryData: any): {
    issuanceToken: Buffer;
    issuingAttributes: {
        expiryDate: string;
        definitions: {
            name: string;
        }[];
    }[];
};
export {};
