'use strict';

const RecommendationResponse = require('./recommendation.response');
const BreakdownResponse = require('./breakdown.response');
const Validation = require('../../../yoti_common/validation');

class ReportResponse {
  constructor(report) {
    if (report.recommendation) {
      this.recommendation = new RecommendationResponse(report.recommendation);
    }

    if (report.breakdown) {
      Validation.isArray(report.breakdown, 'breakdown');
      this.breakdown = report.breakdown.map((breakdown) => new BreakdownResponse(breakdown));
    } else {
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

module.exports = ReportResponse;
