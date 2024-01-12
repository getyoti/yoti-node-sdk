/**
 * @typedef {{data: Buffer, contentType: number}} Value
 *
 * @param {Uint8Array} value
 * @returns {{values: Value[]}}
 */
export function decodeMultiValue(value: Uint8Array): {
    values: {
        data: Buffer;
        contentType: number;
    }[];
};
