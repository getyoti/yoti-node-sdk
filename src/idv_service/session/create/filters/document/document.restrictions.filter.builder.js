'use strict';

const DocumentRestrictionsFilter = require('./document.restrictions.filter');
const DocumentRestriction = require('./document.restriction');
const Validation = require('../../../../../yoti_common/validation');
const IDVConstants = require('../../../../idv.constants');

/**
 * @typedef {import('./../allowed.provider')} AllowedProvider
 */

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
   * @param {Boolean} allowDigitalIds
   *
   * @returns {this}
   */
  withAllowDigitalIds(allowDigitalIds) {
    this.allowDigitalIds = allowDigitalIds;
    return this;
  }

  /**
   * @param {AllowedProvider[]} allowedProviders
   *
   * @returns {this}
   */
  withAllowedProviders(allowedProviders) {
    this.allowedProviders = allowedProviders;
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
      this.allowNonLatinDocuments,
      this.allowDigitalIds,
      this.allowedProviders
    );
  }
}

module.exports = DocumentRestrictionsFilterBuilder;
