export = CaSourcesResponse;
declare class CaSourcesResponse {
    constructor(sources: any);
    /** @private */
    private type;
    /**
     *
     * @return {string}
     */
    getType(): string;
}
declare namespace CaSourcesResponse {
    export { types };
}
declare namespace types {
    export { PROFILE };
    export { TYPE_LIST };
}
import { PROFILE } from "../../idv.constants";
import { TYPE_LIST } from "../../idv.constants";
