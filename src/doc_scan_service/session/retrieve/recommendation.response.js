'use strict';

const Validation = require('../../../yoti_common/validation');

class RecommendationResponse {
  constructor(recommendation) {
    Validation.isString(recommendation.value, 'value', true);
    this.value = recommendation.value;

    Validation.isString(recommendation.reason, 'reason', true);
    this.reason = recommendation.reason;

    Validation.isString(recommendation.recovery_suggestion, 'recovery_suggestion', true);
    this.recoverySuggestion = recommendation.recovery_suggestion;
  }

  getValue() {
    return this.value;
  }

  getReason() {
    return this.reason;
  }

  getRecoverySuggestion() {
    return this.recoverySuggestion;
  }
}

module.exports = RecommendationResponse;
