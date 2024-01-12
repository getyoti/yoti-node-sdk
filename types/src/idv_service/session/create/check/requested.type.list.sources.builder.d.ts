export = RequestedTypeListSourcesBuilder;
/**
 * Builder to assist the creation of {@link RequestedTypeListSources}.
 *
 * @class RequestedTypeListSourcesBuilder
 */
declare class RequestedTypeListSourcesBuilder {
    /**
     * Sets types used for sources
     *
     * @param types {string[]}
     *
     * @returns {this}
     */
    withTypes(types: string[]): this;
    types: string[];
    build(): RequestedTypeListSources;
}
import RequestedTypeListSources = require("./requested.type.list.sources");
