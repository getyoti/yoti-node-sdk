'use strict';

const Validation = require('../../../yoti_common/validation');
const DigitalIdShareErrorResponse = require('./digital.id.share.error.response');

class DigitalIdShareResponse {
  constructor(response) {
    Validation.isString(response.id, 'id', true);
    /** @private */
    this.id = response.id;

    Validation.isString(response.document_type, 'document_type', true);
    /** @private */
    this.documentType = response.document_type;

    Validation.isString(response.issuing_country, 'issuing_country', true);
    /** @private */
    this.issuingCountry = response.issuing_country;

    Validation.isString(response.provider, 'provider', true);
    /** @private */
    this.provider = response.provider;

    Validation.isString(response.created_at, 'created_at', true);
    /** @private */
    this.createdAt = response.created_at;

    Validation.isString(response.last_updated, 'last_updated', true);
    /** @private */
    this.lastUpdated = response.last_updated;

    Validation.isString(response.resource_id, 'resource_id', true);
    /** @private */
    this.resourceId = response.resource_id;

    if (response.error) {
      this.error = new DigitalIdShareErrorResponse(response.error);
    }
  }

  getId() {
    return this.id;
  }

  getDocumentType() {
    return this.documentType;
  }

  getIssuingCountry() {
    return this.issuingCountry;
  }

  getProvider() {
    return this.provider;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getLastUpdated() {
    return this.lastUpdated;
  }

  getResourceId() {
    return this.resourceId;
  }

  getError() {
    return this.error;
  }
}

module.exports = DigitalIdShareResponse;
