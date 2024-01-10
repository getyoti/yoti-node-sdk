/**
 * @param {Uint8Array} binaryData
 * @returns {{version: number, timestamp: number}}
 */
export function decodeSignedTimeStamp(binaryData: Uint8Array): {
    version: number;
    timestamp: number;
};
export function encodeSignedTimeStamp(notificationData: any): Uint8Array;
