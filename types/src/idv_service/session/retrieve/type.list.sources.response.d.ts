export = TypeListSourcesResponse;
declare class TypeListSourcesResponse extends CaSourcesResponse {
    types: any;
    /**
     *
     * @return {string[]}
     */
    getTypes(): string[];
}
import CaSourcesResponse = require("./ca.sources.response");
