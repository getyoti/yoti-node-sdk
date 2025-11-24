import SupportedCountry = require('./supported.country');

class SupportedDocumentsResponse {
  private supportedCountries: any[];

  constructor(response: any) {
    if (response.supported_countries) {
      this.supportedCountries = response.supported_countries
        .map((country: any) => new (SupportedCountry as any)(country));
    } else {
      this.supportedCountries = [];
    }
  }

  getSupportedCountries() {
    return this.supportedCountries;
  }
}

export default SupportedDocumentsResponse;
