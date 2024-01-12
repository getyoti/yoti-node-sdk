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
   * @param {Boolean} allowNonLatinDocuments
   */
  constructor(inclusion, documents, allowExpiredDocuments, allowNonLatinDocuments) {
    super(IDVConstants.DOCUMENT_RESTRICTIONS);

    Validation.isString(inclusion, 'inclusion');
    /** @private */
    this.inclusion = inclusion;

    Validation.isArrayOfType(documents, DocumentRestriction, 'documents');
    /** @private */
    this.documents = documents;

    Validation.isBoolean(allowExpiredDocuments, 'allowExpiredDocuments', true);
    /** @private */
    this.allowExpiredDocuments = allowExpiredDocuments;

    Validation.isBoolean(allowNonLatinDocuments, 'allowNonLatinDocuments', true);
    /** @private */
    this.allowNonLatinDocuments = allowNonLatinDocuments;
  }

  toJSON() {
    const json = super.toJSON();

    json.inclusion = this.inclusion;
    json.documents = this.documents;
    json.allow_expired_documents = this.allowExpiredDocuments;
    json.allow_non_latin_documents = this.allowNonLatinDocuments;

    return json;
  }
}

module.exports = DocumentRestrictionsFilter;
