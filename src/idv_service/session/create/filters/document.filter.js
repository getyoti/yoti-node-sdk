'use strict';

const Validation = require('../../../../yoti_common/validation');
const AllowedProvider = require('./allowed.provider');

class DocumentFilter {
  /**
   * @param {string} type
   * @param {boolean} allowExpiredDocuments
   * @param {boolean} allowNonLatinDocuments
   * @param {boolean} allowDigitalIds
   * @param {AllowedProvider[]} allowedProviders
   */
  constructor(type, allowExpiredDocuments, allowNonLatinDocuments, allowDigitalIds, allowedProviders) {
    if (new.target === DocumentFilter) {
      throw TypeError('DocumentFilter cannot be instantiated');
    }

    Validation.isString(type, 'type');
    /** @private */
    this.type = type;

    Validation.isBoolean(allowExpiredDocuments, 'allowExpiredDocuments', true);
    /** @private */
    this.allowExpiredDocuments = allowExpiredDocuments;

    Validation.isBoolean(allowNonLatinDocuments, 'allowNonLatinDocuments', true);
    /** @private */
    this.allowNonLatinDocuments = allowNonLatinDocuments;

    Validation.isBoolean(allowDigitalIds, 'allowDigitalIds', true);
    /** @private */
    this.allowDigitalIds = allowDigitalIds;

    if (allowedProviders) {
      Validation.isArrayOfType(allowedProviders, AllowedProvider, 'allowedProviders');
      /** @private */
      this.allowedProviders = allowedProviders;
    }
  }

  /**
   * Whether to allow non latin documents
   *
   * @return {boolean} flag
   */
  getAllowNonLatinDocuments() {
    return this.allowNonLatinDocuments;
  }

  /**
   * Whether to allow non expired documents
   *
   * @return {boolean} flag
   */
  getAllowExpiredDocuments() {
    return this.allowExpiredDocuments;
  }

  /**
   * Whether to allow digital IDs to satisfy the filter
   *
   * @return boolean flag
   */
  getAllowDigitalIds() {
    return this.allowDigitalIds;
  }

  /**
   * The list of digital ID providers that are allowed to satisfy the filter
   *
   * @return AllowedProvider[] the allowed providers
   */
  getAllowedProviders() {
    return this.allowedProviders;
  }

  toJSON() {
    return {
      type: this.type,
    };
  }
}

module.exports = DocumentFilter;
