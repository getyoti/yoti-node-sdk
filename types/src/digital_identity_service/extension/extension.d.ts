export = Extension;
declare class Extension {
    /**
     * @param {string} type
     * @param {*} content
     */
    constructor(type: string, content: any);
    type: string;
    content: any;
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
