export = ThirdPartyAttributeExtensionBuilder;
declare class ThirdPartyAttributeExtensionBuilder {
    /** @private */
    private definitions;
    withExpiryDate(expiryDate: any): this;
    expiryDate: any;
    withDefinition(definition: any): this;
    withDefinitions(definitions: any): this;
    build(): Extension;
}
import Extension = require("./extension");
