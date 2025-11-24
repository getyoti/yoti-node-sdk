import RequestedIdDocumentComparisonCheck = require('./requested.id.document.comparison.check');
import RequestedIdDocumentComparisonConfig = require('./requested.id.document.comparison.config');

/**
 * Builder to assist the creation of {@link RequestedIdDocumentComparisonCheck}.
 *
 * @class RequestedIdDocumentComparisonCheckBuilder
 */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["build"] }] */
class RequestedIdDocumentComparisonCheckBuilder {
  build() {
    return new RequestedIdDocumentComparisonCheck(new RequestedIdDocumentComparisonConfig());
  }
}

export default RequestedIdDocumentComparisonCheckBuilder;
