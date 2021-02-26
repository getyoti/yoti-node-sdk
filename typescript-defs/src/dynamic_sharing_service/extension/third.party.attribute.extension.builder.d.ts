export = ThirdPartyAttributeExtensionBuilder;
declare class ThirdPartyAttributeExtensionBuilder {
    definitions: any[];
    withExpiryDate(expiryDate: any): ThirdPartyAttributeExtensionBuilder;
    expiryDate: any;
    withDefinition(definition: any): ThirdPartyAttributeExtensionBuilder;
    withDefinitions(definitions: any): ThirdPartyAttributeExtensionBuilder;
    build(): Extension;
}
import Extension = require("./extension");
