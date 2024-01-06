export = WantedAnchor;
declare class WantedAnchor {
    /**
     * @param {string} value
     * @param {string} subType
     */
    constructor(value: string, subType?: string);
    /** @private */
    private value;
    /** @private */
    private subType;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
