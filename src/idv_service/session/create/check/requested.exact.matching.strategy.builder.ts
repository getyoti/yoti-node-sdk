import RequestedExactMatchingStrategy = require('./requested.exact.matching.strategy');

/**
 *
 * Builder to assist creation of {@link RequestedExactMatchingStrategy}.
 *
 * @class RequestedExactMatchingStrategyBuilder
 */
class RequestedExactMatchingStrategyBuilder {
  /**
   *
   * @return {RequestedExactMatchingStrategy}
   */
  // eslint-disable-next-line class-methods-use-this
  build() {
    return new RequestedExactMatchingStrategy();
  }
}

export default RequestedExactMatchingStrategyBuilder;
