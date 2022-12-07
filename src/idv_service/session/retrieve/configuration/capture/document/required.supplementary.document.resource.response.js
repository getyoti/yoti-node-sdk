'use strict';

const Validation = require('../../../../../../yoti_common/validation');
const ObjectiveResponse = require('./objective.response');
const RequiredDocumentResourceResponse = require('./required.document.resource.response');

class RequiredSupplementaryDocumentResourceResponse extends RequiredDocumentResourceResponse {
  /**
   * @param {object} requiredResource
   */
  constructor(requiredResource) {
    super(requiredResource);

    Validation.isArrayOfStrings(requiredResource.document_types, 'document_types');
    this.documentTypes = requiredResource.document_types;

    Validation.isArrayOfStrings(requiredResource.country_codes, 'country_codes');
    this.countryCodes = requiredResource.country_codes;

    if (requiredResource.objective) {
      Validation.isPlainObject(requiredResource.objective, 'objective');
      this.objective = new ObjectiveResponse(requiredResource.objective);
    }
  }

  /**
   * Returns a list of document types that can be used to satisfy the requirement
   *
   * @return {string[] | null}
   */
  getDocumentTypes() {
    return this.documentTypes;
  }

  /**
   * Returns a list of country codes that can be used to satisfy the requirement
   *
   * @return {string[] | null}
   */
  getCountryCodes() {
    return this.countryCodes;
  }

  /**
   * Returns the objective that the
   * {@link RequiredSupplementaryDocumentResourceResponse} will satisfy
   *
   * @return {ObjectiveResponse | null}
   */
  getObjective() {
    return this.objective;
  }
}

module.exports = RequiredSupplementaryDocumentResourceResponse;
