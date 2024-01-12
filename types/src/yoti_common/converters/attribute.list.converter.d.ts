export class AttributeListConverter {
    static convertAttributeList(attributes?: any[]): {
        name: any;
        value: any;
        sources: import("../../data_type/anchor").YotiAnchor[];
        verifiers: import("../../data_type/anchor").YotiAnchor[];
        anchors: {
            [x: string]: import("../../data_type/anchor").YotiAnchor[];
        };
        id: any;
    }[];
}
