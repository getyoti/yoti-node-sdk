/**
 * @param {Uint8Array} binaryData
 * @returns {{cipherText: string, iv: string}}
 */
export function decodeEncryptedData(binaryData: Uint8Array): {
    cipherText: string;
    iv: string;
};
export function encodeEncryptedData(notificationData: any): Uint8Array;
