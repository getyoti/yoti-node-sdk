export = DetailsResponse;
declare class DetailsResponse {
    constructor(details: any);
    /** @private */
    private name;
    /** @private */
    private value;
    /**
     * @returns {string}
     */
    getName(): string;
    /**
     * @returns {string}
     */
    getValue(): string;
}
