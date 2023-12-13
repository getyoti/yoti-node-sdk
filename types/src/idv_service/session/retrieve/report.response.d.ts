export = ReportResponse;
declare class ReportResponse {
    constructor(report: any);
    recommendation: RecommendationResponse;
    breakdown: any;
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
