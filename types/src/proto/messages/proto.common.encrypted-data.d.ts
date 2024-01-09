export type Message = import('protobufjs').Message;
/**
 * @param {Uint8Array} binaryData
 * @returns {Message<{cipherText: string, iv: string}>}
 */
declare function decodeEncryptedData(binaryData: Uint8Array): any;
declare function encodeEncryptedData(notificationData: any): Uint8Array;
export {};
