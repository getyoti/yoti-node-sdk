export type Message = import('protobufjs').Message;
/**
 * @param {Uint8Array} binaryData
 * @returns {{cipherText: string, iv: string}}
 */
declare function decodeEncryptedData(binaryData: Uint8Array): {
    cipherText: string;
    iv: string;
};
declare function encodeEncryptedData(notificationData: any): Uint8Array;
export {};
