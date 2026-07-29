'use strict';

const Validation = require('../../../yoti_common/validation');
const DigitalIdShareErrorResponse = require('./digital.id.share.error.response');
const { YotiDate } = require('../../../data_type/date');

class DigitalIdShareResponse {
  constructor(response) {
    Validation.isString(response.id, 'id');
    /** @private */
    this.id = response.id;

    Validation.isString(response.document_type, 'document_type');
    /** @private */
    this.documentType = response.document_type;

    Validation.isString(response.issuing_country, 'issuing_country');
    /** @private */
    this.issuingCountry = response.issuing_country;

    Validation.isString(response.provider, 'provider');
    /** @private */
    this.provider = response.provider;

    Validation.isStringDate(response.created_at, 'created_at');
    /** @private */
    this.createdAt = YotiDate.fromDateString(response.created_at);

    Validation.isStringDate(response.last_updated, 'last_updated');
    /** @private */
    this.lastUpdated = YotiDate.fromDateString(response.last_updated);

    Validation.isString(response.resource_id, 'resource_id');
    /** @private */
    this.resourceId = response.resource_id;

    if (response.error) {
      this.error = new DigitalIdShareErrorResponse(response.error);
    }
  }

  /**
   * @returns {string}
   */
  getId() {
    return this.id;
  }

  /**
   * @returns {string}
   */
  getDocumentType() {
    return this.documentType;
  }

  /**
   * @returns {string}
   */
  getIssuingCountry() {
    return this.issuingCountry;
  }

  /**
   * @returns {string}
   */
  getProvider() {
    return this.provider;
  }

  /**
   * @returns {YotiDate}
   */
  getCreatedAt() {
    return this.createdAt;
  }

  /**
   * @returns {YotiDate}
   */
  getLastUpdated() {
    return this.lastUpdated;
  }

  /**
   * @returns {string}
   */
  getResourceId() {
    return this.resourceId;
  }

  /**
   * @returns {DigitalIdShareErrorResponse|undefined}
   */
  getError() {
    return this.error;
  }
}

module.exports = DigitalIdShareResponse;
