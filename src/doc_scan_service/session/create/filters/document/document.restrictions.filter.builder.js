const DocumentRestrictionsFilter = require('./document.restrictions.filter');
const DocumentRestriction = require('./document.restriction');
const DocScanConstants = require('../../../../doc.scan.constants');

class DocumentRestrictionsFilterBuilder {
  constructor() {
    this.documents = [];
  }

  /**
   * @returns {this}
   */
  forWhitelist() {
    this.inclusion = DocScanConstants.INCLUSION_WHITELIST;
    return this;
  }

  /**
   * @returns {this}
   */
  forBlacklist() {
    this.inclusion = DocScanConstants.INCLUSION_BLACKLIST;
    return this;
  }

  /**
   * @param {string[]} countryCodes
   * @param {string[]} documentTypes
   *
   * @returns {this}
   */
  withDocumentRestriction(countryCodes, documentTypes) {
    this.documents.push(new DocumentRestriction(countryCodes, documentTypes));
    return this;
  }

  /**
   * @returns {DocumentRestrictionsFilter}
   */
  build() {
    return new DocumentRestrictionsFilter(this.inclusion, this.documents);
  }
}

module.exports = DocumentRestrictionsFilterBuilder;
