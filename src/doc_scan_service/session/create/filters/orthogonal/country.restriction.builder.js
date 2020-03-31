const Validation = require('../../../../../yoti_common/validation');
const CountryRestriction = require('./country.restriction');
const DocScanConstants = require('../../../../doc.scan.constants');

class CountryRestrictionBuilder {
  constructor() {
    this.countryCodes = [];
  }

  forWhitelist() {
    this.inclusion = DocScanConstants.INCLUSION_WHITELIST;
    return this;
  }

  forBlacklist() {
    this.inclusion = DocScanConstants.INCLUSION_BLACKLIST;
    return this;
  }

  withCountryCode(countryCode) {
    Validation.isString(countryCode, 'countryCode');
    this.countryCodes.push(countryCode);
    return this;
  }

  build() {
    return new CountryRestriction(this.inclusion, this.countryCodes);
  }
}

module.exports = CountryRestrictionBuilder;
