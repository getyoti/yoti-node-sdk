export = AllowedProviderBuilder;
declare class AllowedProviderBuilder {
    withName(provider: any): this;
    name: any;
    /**
     * @returns {AllowedProvider}
     */
    build(): AllowedProvider;
}
import AllowedProvider = require("./allowed.provider");
