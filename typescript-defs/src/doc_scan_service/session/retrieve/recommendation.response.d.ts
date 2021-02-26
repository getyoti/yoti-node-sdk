export = RecommendationResponse;
declare class RecommendationResponse {
    constructor(recommendation: any);
    value: any;
    reason: any;
    recoverySuggestion: any;
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
