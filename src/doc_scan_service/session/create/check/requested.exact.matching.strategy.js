'use strict';

const { EXACT } = require('../../../doc.scan.constants');
const RequestedCaMatchingStrategy = require('./requested.ca.matching.strategy');

/**
 *
 * @class RequestedExactMatchingStrategy
 */
class RequestedExactMatchingStrategy extends RequestedCaMatchingStrategy {
  constructor() {
    super(EXACT);
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      type: this.type,
    };
  }
}

module.exports = RequestedExactMatchingStrategy;
