export = ThirdPartyAttributeExtensionContent;
declare class ThirdPartyAttributeExtensionContent {
    constructor(expiryDate: any, definitions: any);
    expiryDate: any;
    definitions: any;
    getExpiryDate(): any;
    getDefinitions(): any;
    toJSON(): {
        expiry_date: any;
        definitions: any;
    };
}
