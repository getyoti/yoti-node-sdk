'use strict';

const SupportedCountry = require('./supported.country');

class SupportedDocumentsResponse {
  constructor(response) {
    if (response.supported_countries) {
      /** @private */
      this.supportedCountries = response.supported_countries
        .map((country) => new SupportedCountry(country));
    } else {
      /** @private */
      this.supportedCountries = [];
    }
  }

  getSupportedCountries() {
    return this.supportedCountries;
  }
}

module.exports = SupportedDocumentsResponse;
