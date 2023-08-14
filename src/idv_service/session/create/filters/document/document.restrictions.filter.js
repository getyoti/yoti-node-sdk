'use strict';

const Validation = require('../../../../../yoti_common/validation');
const DocumentFilter = require('../document.filter');
const DocumentRestriction = require('./document.restriction');
const IDVConstants = require('../../../../idv.constants');

class DocumentRestrictionsFilter extends DocumentFilter {
  /**
   * @param {string} inclusion
   * @param {DocumentRestriction[]} documents
   * @param {Boolean} allowExpiredDocuments
   */
  constructor(inclusion, documents, allowExpiredDocuments) {
    super(IDVConstants.DOCUMENT_RESTRICTIONS);

    Validation.isString(inclusion, 'inclusion');
    this.inclusion = inclusion;

    Validation.isArrayOfType(documents, DocumentRestriction, 'documents');
    this.documents = documents;

    Validation.isBoolean(allowExpiredDocuments, 'allowExpiredDocuments', true);
    this.allowExpiredDocuments = allowExpiredDocuments;
  }

  toJSON() {
    const json = super.toJSON();

    json.inclusion = this.inclusion;
    json.documents = this.documents;
    json.allow_expired_documents = this.allowExpiredDocuments;

    return json;
  }
}

module.exports = DocumentRestrictionsFilter;
