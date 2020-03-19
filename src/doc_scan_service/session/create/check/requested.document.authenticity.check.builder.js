'use strict';

const RequestedDocumentAuthenticityCheck = require('./requested.document.authenticity.check');
const RequestedDocumentAuthenticityConfig = require('./requested.document.authenticity.config');

/**
 * Builder to assist the creation of {@link RequestedDocumentAuthenticityCheck}.
 *
 * @class RequestedDocumentAuthenticityCheckBuilder
 */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["build"] }] */
class RequestedDocumentAuthenticityCheckBuilder {
  build() {
    return new RequestedDocumentAuthenticityCheck(new RequestedDocumentAuthenticityConfig());
  }
}

module.exports = RequestedDocumentAuthenticityCheckBuilder;
