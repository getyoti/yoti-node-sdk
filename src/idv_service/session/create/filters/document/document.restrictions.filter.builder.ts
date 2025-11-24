import DocumentRestrictionsFilter = require('./document.restrictions.filter');
import DocumentRestriction = require('./document.restriction');
import Validation = require('../../../../../yoti_common/validation');
import IDVConstants = require('../../../../idv.constants');

class DocumentRestrictionsFilterBuilder {
  constructor() {
    /** @private */
    this.documents = [];
  }

  /**
   * @returns {this}
   */
  forWhitelist() {
    this.inclusion = IDVConstants.INCLUSION_WHITELIST;
    return this;
  }

  /**
   * @returns {this}
   */
  forBlacklist() {
    this.inclusion = IDVConstants.INCLUSION_BLACKLIST;
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
   * @param {Boolean} allowExpiredDocuments
   *
   * @returns {this}
   */
  withAllowExpiredDocuments(allowExpiredDocuments) {
    Validation.isBoolean(allowExpiredDocuments, 'allowExpiredDocuments');
    this.allowExpiredDocuments = allowExpiredDocuments;
    return this;
  }

  /**
   * @param {Boolean} allowNonLatinDocuments
   *
   * @returns {this}
   */
  withAllowNonLatinDocuments(allowNonLatinDocuments) {
    this.allowNonLatinDocuments = allowNonLatinDocuments;
    return this;
  }

  /**
   * @returns {DocumentRestrictionsFilter}
   */
  build() {
    return new DocumentRestrictionsFilter(
      this.inclusion,
      this.documents,
      this.allowExpiredDocuments,
      this.allowNonLatinDocuments
    );
  }
}

export default DocumentRestrictionsFilterBuilder;
