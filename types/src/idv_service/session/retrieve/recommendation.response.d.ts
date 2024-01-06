export = RecommendationResponse;
declare class RecommendationResponse {
    constructor(recommendation: any);
    /** @private */
    private value;
    /** @private */
    private reason;
    /** @private */
    private recoverySuggestion;
    /**
     * @returns {string}
     */
    getValue(): string;
    /**
     * @returns {string}
     */
    getReason(): string;
    /**
     * @returns {string}
     */
    getRecoverySuggestion(): string;
}
