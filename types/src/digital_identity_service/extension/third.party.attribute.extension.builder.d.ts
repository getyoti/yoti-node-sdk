export = ThirdPartyAttributeExtensionBuilder;
/**
 * Builds a third party attribute Extension.
 *
 * @class ThirdPartyAttributeExtensionBuilder
 */
declare class ThirdPartyAttributeExtensionBuilder {
    definitions: any[];
    withExpiryDate(expiryDate: any): this;
    expiryDate: any;
    withDefinition(definition: any): this;
    withDefinitions(definitions: any): this;
    build(): Extension;
}
import Extension = require("./extension");
