export = IdentityProfileSchemeResponse;
declare class IdentityProfileSchemeResponse {
    constructor(scheme: any);
    /** @private {string} */
    private type;
    /** @private {string} */
    private objective;
    /**
     * @returns {string}
     */
    getType(): string;
    /**
     * @returns {string|undefined}
     */
    getObjective(): string | undefined;
}
