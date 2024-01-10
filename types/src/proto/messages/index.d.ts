declare const _exports: {
    decodeSignedTimeStamp(binaryData: Uint8Array): {
        version: number;
        timestamp: number;
    };
    encodeSignedTimeStamp(notificationData: any): Uint8Array;
    decodeThirdPartyAttribute(binaryData: any): {
        issuanceToken: Buffer;
        issuingAttributes: {
            expiryDate: string;
            definitions: {
                name: string;
            }[];
        };
    };
    decodeExtraData(binaryData: any): {
        list: any[];
    };
    decodeEncryptedData(binaryData: Uint8Array): {
        cipherText: string;
        iv: string;
    };
    encodeEncryptedData(notificationData: any): Uint8Array;
    decodeMultiValue(value: Uint8Array): {
        values: {
            data: Buffer;
            contentType: number;
        }[];
    };
    decodeAttributeList(binaryData: Uint8Array): {
        attributes: protobuf.Type[];
    };
    encodeAttributeList(attributesData: any): Uint8Array;
};
export = _exports;
