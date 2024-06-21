export = AdvancedIdentityProfileSchemeResponse;
declare class AdvancedIdentityProfileSchemeResponse {
    constructor(scheme: any);
    /** @private {string} */
    private type;
    /** @private {string} */
    private objective;
    /** @private {string} */
    private label;
    /**
     * @returns {string}
     */
    getType(): string;
    /**
     * @returns {string}
     */
    getObjective(): string;
    /**
     * @returns {string}
     */
    getLabel(): string;
}
