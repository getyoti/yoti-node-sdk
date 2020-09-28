'use strict';

const Validation = require('../../../../../yoti_common/validation');
const DocumentFilter = require('../document.filter');
const DocumentRestriction = require('./document.restriction');
const DocScanConstants = require('../../../../doc.scan.constants');

class DocumentRestrictionsFilter extends DocumentFilter {
  /**
   * @param {string} inclusion
   * @param {DocumentRestriction[]} documents
   */
  constructor(inclusion, documents) {
    super(DocScanConstants.DOCUMENT_RESTRICTIONS);

    Validation.isString(inclusion, 'inclusion');
    this.inclusion = inclusion;

    Validation.isArrayOfType(documents, DocumentRestriction, 'documents');
    this.documents = documents;
  }

  toJSON() {
    const json = super.toJSON();

    json.inclusion = this.inclusion;
    json.documents = this.documents;

    return json;
  }
}

module.exports = DocumentRestrictionsFilter;
