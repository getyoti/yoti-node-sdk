export = ThirdPartyAttributeExtensionContent;
/**
 * Defines third party attribute extension content.
 *
 * @class ThirdPartyAttributeExtensionContent
 */
declare class ThirdPartyAttributeExtensionContent {
    constructor(expiryDate: any, definitions: any);
    /** @private */
    private expiryDate;
    /** @private */
    private definitions;
    getExpiryDate(): any;
    getDefinitions(): any;
    toJSON(): {
        expiry_date: any;
        definitions: any;
    };
}
