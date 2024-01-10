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
     * Returns serialized data for JSON.stringify()
     */
    toJSON(): {
        name: string;
        sub_type: string;
    };
}
