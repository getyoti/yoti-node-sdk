export = Extension;
declare class Extension {
    /**
     * @param {string} type
     * @param {*} content
     */
    constructor(type: string, content: any);
    /** @private */
    private type;
    /** @private */
    private content;
    /**
     * @returns {string} type
     */
    getType(): string;
    /**
     * @returns {*} content
     */
    getContent(): any;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
