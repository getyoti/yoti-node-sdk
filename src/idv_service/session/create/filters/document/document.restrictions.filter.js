'use strict';

const Validation = require('../../../../../yoti_common/validation');
const DocumentFilter = require('../document.filter');
const DocumentRestriction = require('./document.restriction');
const IDVConstants = require('../../../../idv.constants');

/**
 * @typedef {import('./../allowed.provider')} AllowedProvider
 */

class DocumentRestrictionsFilter extends DocumentFilter {
  /**
   * @param {string} inclusion
   * @param {DocumentRestriction[]} documents
   * @param {Boolean} allowExpiredDocuments
   * @param {Boolean} allowNonLatinDocuments
   * @param {boolean} allowDigitalIds
   * @param {AllowedProvider[]} allowedProviders
   */
  constructor(inclusion, documents, allowExpiredDocuments, allowNonLatinDocuments, allowDigitalIds, allowedProviders) {
    super(IDVConstants.DOCUMENT_RESTRICTIONS, allowExpiredDocuments, allowNonLatinDocuments, allowDigitalIds, allowedProviders);

    Validation.isString(inclusion, 'inclusion');
    /** @private */
    this.inclusion = inclusion;

    Validation.isArrayOfType(documents, DocumentRestriction, 'documents');
    /** @private */
    this.documents = documents;
  }

  toJSON() {
    const json = super.toJSON();

    json.inclusion = this.inclusion;
    json.documents = this.documents;
    json.allow_expired_documents = this.getAllowExpiredDocuments();
    json.allow_non_latin_documents = this.getAllowNonLatinDocuments();
    json.allow_digital_ids = this.getAllowDigitalIds();
    json.allowed_providers = this.getAllowedProviders();

    return json;
  }
}

module.exports = DocumentRestrictionsFilter;
