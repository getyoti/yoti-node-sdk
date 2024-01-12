export = TypeListSourcesResponse;
declare class TypeListSourcesResponse extends CaSourcesResponse {
    /** @private */
    private types;
    /**
     *
     * @return {string[]}
     */
    getTypes(): string[];
}
import CaSourcesResponse = require("./ca.sources.response");
