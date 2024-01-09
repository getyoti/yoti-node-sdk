declare const _exports: {
    decodeSignedTimeStamp(binaryData: any): protobuf.Message<{}>;
    encodeSignedTimeStamp(notificationData: any): Uint8Array;
    decodeThirdPartyAttribute(binaryData: any): any;
    decodeExtraData(binaryData: any): protobuf.Message<{}>;
    decodeEncryptedData(binaryData: Uint8Array): any;
    encodeEncryptedData(notificationData: any): Uint8Array;
    decodeMultiValue(value: any): protobuf.Message<{}>;
    decodeAttributeList(binaryData: Buffer): any;
    encodeAttributeList(attributesData: any): Uint8Array;
};
export = _exports;
