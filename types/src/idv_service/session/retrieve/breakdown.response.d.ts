export = BreakdownResponse;
declare class BreakdownResponse {
    constructor(breakdown: any);
    /** @private */
    private subCheck;
    /** @private */
    private result;
    /** @private */
    private details;
    /**
     * @returns {string}
     */
    getSubCheck(): string;
    /**
     * @returns {string}
     */
    getResult(): string;
    /**
     * @returns {DetailsResponse[]}
     */
    getDetails(): DetailsResponse[];
}
import DetailsResponse = require("./details.response");
