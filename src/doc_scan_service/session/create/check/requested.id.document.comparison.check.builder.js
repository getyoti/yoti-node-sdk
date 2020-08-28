'use strict';

const RequestedIdDocumentComparisonCheck = require('./requested.id.document.comparison.check');
const RequestedIdDocumentComparisonConfig = require('./requested.id.document.comparison.config');

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

module.exports = RequestedIdDocumentComparisonCheckBuilder;
