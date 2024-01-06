export = CaMatchingStrategyResponse;
declare class CaMatchingStrategyResponse {
    constructor(matchingStrategy: any);
    /** @private */
    private type;
    /**
     *
     * @return {string}
     */
    getType(): string;
}
declare namespace CaMatchingStrategyResponse {
    export { types };
}
declare namespace types {
    export { EXACT };
    export { FUZZY };
}
import { EXACT } from "../../idv.constants";
import { FUZZY } from "../../idv.constants";
