'use strict';

const Validation = require('../../../yoti_common/validation');

class RecommendationResponse {
  constructor(recommendation) {
    Validation.isString(recommendation.value, 'value', true);
    /** @private */
    this.value = recommendation.value;

    Validation.isString(recommendation.reason, 'reason', true);
    /** @private */
    this.reason = recommendation.reason;

    Validation.isString(recommendation.recovery_suggestion, 'recovery_suggestion', true);
    /** @private */
    this.recoverySuggestion = recommendation.recovery_suggestion;
  }

  /**
   * @returns {string}
   */
  getValue() {
    return this.value;
  }

  /**
   * @returns {string}
   */
  getReason() {
    return this.reason;
  }

  /**
   * @returns {string}
   */
  getRecoverySuggestion() {
    return this.recoverySuggestion;
  }
}

module.exports = RecommendationResponse;
