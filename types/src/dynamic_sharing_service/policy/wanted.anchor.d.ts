export = WantedAnchor;
declare class WantedAnchor {
    /**
     * @param {string} value
     * @param {string} subType
     */
    constructor(value: string, subType?: string);
    value: string;
    subType: string;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
