export function decodeAttributeList(binaryData: any): ({
    base64SelfieUri: string;
    extendedProfile?: undefined;
} | {
    [x: number]: any;
    base64SelfieUri?: undefined;
    extendedProfile?: undefined;
} | {
    extendedProfile: {
        name: any;
        value: any;
        sources: import("../data_type/anchor").YotiAnchor[];
        verifiers: import("../data_type/anchor").YotiAnchor[];
        anchors: {
            [x: string]: import("../data_type/anchor").YotiAnchor[];
        };
    }[];
    base64SelfieUri?: undefined;
})[];
export function decodeAttributeList(binaryData: any): ({
    base64SelfieUri: string;
    extendedProfile?: undefined;
} | {
    [x: number]: any;
    base64SelfieUri?: undefined;
    extendedProfile?: undefined;
} | {
    extendedProfile: {
        name: any;
        value: any;
        sources: import("../data_type/anchor").YotiAnchor[];
        verifiers: import("../data_type/anchor").YotiAnchor[];
        anchors: {
            [x: string]: import("../data_type/anchor").YotiAnchor[];
        };
    }[];
    base64SelfieUri?: undefined;
})[];
export function encodeAttributeList(notificationData: any): any;
export function encodeAttributeList(notificationData: any): any;
