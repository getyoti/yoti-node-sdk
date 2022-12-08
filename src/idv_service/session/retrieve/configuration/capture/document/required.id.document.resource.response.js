'use strict';

const Validation = require('../../../../../../yoti_common/validation');
const RequiredDocumentResourceResponse = require('./required.document.resource.response');
const SupportedCountryResponse = require('./supported.country.response');

class RequiredIdDocumentResourceResponse extends RequiredDocumentResourceResponse {
  /**
   * @param {object} requiredResource
   */
  constructor(requiredResource) {
    super(requiredResource);

    if (requiredResource.supported_countries) {
      Validation.isArray(requiredResource.supported_countries, 'supported_countries');
      this.supportedCountries = requiredResource.supported_countries.map(
        (supportedCountry) => new SupportedCountryResponse(supportedCountry)
      );
    }

    Validation.isString(requiredResource.allowed_capture_methods, 'allowed_capture_methods');
    this.allowedCaptureMethods = requiredResource.allowed_capture_methods;

    Validation.isPlainObject(requiredResource.attempts_remaining, 'attempts_remaining');
    this.attemptsRemaining = requiredResource.attempts_remaining;
  }

  /**
   * Returns a list of supported country codes, that can be used
   * to satisfy the requirement.  Each supported country will contain
   * a list of document types that can be used.
   *
   * @return {SupportedCountryResponse[] | null}
   */
  getSupportedCountries() {
    return this.supportedCountries;
  }

  /**
   * Returns the allowed capture method as a String
   *
   * @return {string | null}
   */
  getAllowedCaptureMethods() {
    return this.allowedCaptureMethods;
  }

  /**
   * Returns a Map, that is used to track how many attempts are
   * remaining when performing text-extraction.
   *
   * @return {object | null}
   */
  getAttemptsRemaining() {
    return this.attemptsRemaining;
  }
}

module.exports = RequiredIdDocumentResourceResponse;
