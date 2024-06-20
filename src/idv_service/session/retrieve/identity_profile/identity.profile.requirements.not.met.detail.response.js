'use strict';

const Validation = require('../../../../yoti_common/validation');

class IdentityProfileRequirementsNotMetDetailResponse {
  constructor(requirementsNotMetDetail) {
    Validation.isString(requirementsNotMetDetail.failure_type, 'failure_type');
    /** @private @type {string} */
    this.failureType = requirementsNotMetDetail.failure_type;

    Validation.isString(requirementsNotMetDetail.document_type, 'document_type');
    /** @private @type {string} */
    this.documentType = requirementsNotMetDetail.document_type;

    Validation.isString(requirementsNotMetDetail.document_country_iso_code, 'document_country_iso_code');
    /** @private @type {string} */
    this.documentCountryIsoCode = requirementsNotMetDetail.document_country_iso_code;

    Validation.isString(requirementsNotMetDetail.audit_id, 'audit_id', true);
    /** @private @type {string|undefined} */
    this.auditId = requirementsNotMetDetail.audit_id;

    Validation.isString(requirementsNotMetDetail.details, 'details');
    /** @private @type {string} */
    this.details = requirementsNotMetDetail.details;
  }

  getFailureType() {
    return this.failureType;
  }

  getDocumentType() {
    return this.documentType;
  }

  getDocumentCountryIsoCode() {
    return this.documentCountryIsoCode;
  }

  getAuditId() {
    return this.auditId;
  }

  getDetails() {
    return this.details;
  }
}

module.exports = IdentityProfileRequirementsNotMetDetailResponse;
