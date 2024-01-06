export = ReportResponse;
declare class ReportResponse {
    constructor(report: any);
    /** @private */
    private recommendation;
    /** @private */
    private breakdown;
    /**
     * @returns {RecommendationResponse}
     */
    getRecommendation(): RecommendationResponse;
    /**
     * @returns {BreakdownResponse[]}
     */
    getBreakdown(): BreakdownResponse[];
}
import RecommendationResponse = require("./recommendation.response");
import BreakdownResponse = require("./breakdown.response");
