export = AllowedProvider;
declare class AllowedProvider {
    /**
     * @param {string} name
     */
    constructor(name: string);
    /** @private */
    private name;
    toJSON(): {
        name: string;
    };
}
