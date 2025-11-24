import RecommendationResponse = require('./recommendation.response');
import BreakdownResponse = require('./breakdown.response');
import Validation = require('../../../yoti_common/validation');

class ReportResponse {
  constructor(report) {
    if (report.recommendation) {
      /** @private */
      this.recommendation = new RecommendationResponse(report.recommendation);
    }

    if (report.breakdown) {
      Validation.isArray(report.breakdown, 'breakdown');
      /** @private */
      this.breakdown = report.breakdown.map((breakdown) => new BreakdownResponse(breakdown));
    } else {
      /** @private */
      this.breakdown = [];
    }
  }

  /**
   * @returns {RecommendationResponse}
   */
  getRecommendation() {
    return this.recommendation;
  }

  /**
   * @returns {BreakdownResponse[]}
   */
  getBreakdown() {
    return this.breakdown;
  }
}

export default ReportResponse;
