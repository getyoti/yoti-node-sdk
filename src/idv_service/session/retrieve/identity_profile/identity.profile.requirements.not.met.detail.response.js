'use strict';

const Validation = require('../../../../yoti_common/validation');

class IdentityProfileRequirementsNotMetDetailResponse {
  constructor(requirementsNotMetDetail) {
    Validation.isString(requirementsNotMetDetail.failure_type, 'failure_type');
    /** @private {string} */
    this.failureType = requirementsNotMetDetail.failure_type;

    Validation.isString(requirementsNotMetDetail.document_type, 'document_type', true);
    /** @private {string|undefined} */
    this.documentType = requirementsNotMetDetail.document_type;

    Validation.isString(requirementsNotMetDetail.document_country_iso_code, 'document_country_iso_code', true);
    /** @private {string|undefined} */
    this.documentCountryIsoCode = requirementsNotMetDetail.document_country_iso_code;

    Validation.isString(requirementsNotMetDetail.audit_id, 'audit_id', true);
    /** @private {string|undefined} */
    this.auditId = requirementsNotMetDetail.audit_id;

    Validation.isString(requirementsNotMetDetail.details, 'details', true);
    /** @private {string|undefined} */
    this.details = requirementsNotMetDetail.details;
  }

  /**
   * @returns {string}
   */
  getFailureType() {
    return this.failureType;
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
  getDocumentCountryIsoCode() {
    return this.documentCountryIsoCode;
  }

  /**
   * @returns {string|undefined}
   */
  getAuditId() {
    return this.auditId;
  }

  /**
   * @returns {string}
   */
  getDetails() {
    return this.details;
  }
}

module.exports = IdentityProfileRequirementsNotMetDetailResponse;
