declare const _exports: {
    decodeSignedTimeStamp(binaryData: any): protobuf.Message<{}>;
    encodeSignedTimeStamp(notificationData: any): Uint8Array;
    decodeThirdPartyAttribute(binaryData: any): {
        issuanceToken: Buffer;
        issuingAttributes: {
            expiryDate: string;
            definitions: {
                name: string;
            }[];
        }[];
    };
    decodeExtraData(binaryData: any): protobuf.Message<{}>;
    decodeEncryptedData(binaryData: Uint8Array): {
        cipherText: string;
        iv: string;
    };
    encodeEncryptedData(notificationData: any): Uint8Array;
    decodeMultiValue(value: any): protobuf.Message<{}>;
    decodeAttributeList(binaryData: Buffer): {
        attributes: protobuf.Type[];
    };
    encodeAttributeList(attributesData: any): Uint8Array;
};
export = _exports;
