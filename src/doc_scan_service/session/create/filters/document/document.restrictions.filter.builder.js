'use strict';

const DocumentRestrictionsFilter = require('./document.restrictions.filter');
const DocumentRestriction = require('./document.restriction');
const Validation = require('../../../../../yoti_common/validation');
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
   * @param {DocumentRestriction} documentRestriction
   *
   * @returns {this}
   */
  withDocumentRestriction(documentRestriction) {
    Validation.instanceOf(documentRestriction, DocumentRestriction, 'documentRestriction');
    this.documents.push(documentRestriction);
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
