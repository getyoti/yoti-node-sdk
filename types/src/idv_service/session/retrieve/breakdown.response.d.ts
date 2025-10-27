export = BreakdownResponse;
declare class BreakdownResponse {
    constructor(breakdown: any);
    /** @private */
    private subCheck;
    /** @private */
    private result;
    /** @private */
    private process;
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
     * @returns {string|undefined} Likely 'AUTOMATED' or 'EXPERT_REVIEW'
     */
    getProcess(): string | undefined;
    /**
     * @returns {DetailsResponse[]}
     */
    getDetails(): DetailsResponse[];
}
import DetailsResponse = require("./details.response");
