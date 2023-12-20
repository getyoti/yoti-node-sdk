export = BreakdownResponse;
declare class BreakdownResponse {
    constructor(breakdown: any);
    subCheck: any;
    result: any;
    details: any;
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
