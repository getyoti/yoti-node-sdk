/**
 * @typedef {Object} Definition
 * @property {string} name
 *
 * @typedef {Object} IssuingAttributes
 * @property {string} expiryDate
 * @property {Definition[]} definitions
 *
 * @returns {{issuanceToken: Buffer, issuingAttributes:IssuingAttributes }}
 */
export function decodeThirdPartyAttribute(binaryData: any): {
    issuanceToken: Buffer;
    issuingAttributes: {
        expiryDate: string;
        definitions: {
            name: string;
        }[];
    };
};
