const Validation = require('../../../../../yoti_common/validation');
const DocumentRestrictionsFilter = require('./document.restrictions.filter');
const DocumentRestriction = require('./document.restriction');
const DocScanConstants = require('../../../../doc.scan.constants');

class DocumentRestrictionsFilterBuilder {
  constructor() {
    this.documents = [];
  }

  forWhitelist() {
    this.inclusion = DocScanConstants.INCLUSION_WHITELIST;
    return this;
  }

  forBlacklist() {
    this.inclusion = DocScanConstants.INCLUSION_BLACKLIST;
    return this;
  }

  withDocumentRestriction(document) {
    Validation.instanceOf(document, DocumentRestriction, 'document');
    this.documents.push(document);
    return this;
  }

  build() {
    return new DocumentRestrictionsFilter(this.inclusion, this.documents);
  }
}

module.exports = DocumentRestrictionsFilterBuilder;
