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

  withDocumentRestriction(countryCodes, documentTypes) {
    this.documents.push(new DocumentRestriction(countryCodes, documentTypes));
    return this;
  }

  build() {
    return new DocumentRestrictionsFilter(this.inclusion, this.documents);
  }
}

module.exports = DocumentRestrictionsFilterBuilder;
