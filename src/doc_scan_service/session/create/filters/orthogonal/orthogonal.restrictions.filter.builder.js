'use strict';

const OrthogonalRestrictionsFilter = require('./orthogonal.restrictions.filter');
const TypeRestriction = require('./type.restriction');
const CountryRestriction = require('./country.restriction');
const DocScanConstants = require('../../../../doc.scan.constants');

class OrthogonalRestrictionsFilterBuilder {
  /**
   * @param {string[]} countryCodes
   */
  withWhitelistedCountries(countryCodes) {
    this.countryRestriction = new CountryRestriction(
      DocScanConstants.INCLUSION_WHITELIST,
      countryCodes
    );
    return this;
  }

  /**
   * @param {string[]} countryCodes
   */
  withBlacklistedCountries(countryCodes) {
    this.countryRestriction = new CountryRestriction(
      DocScanConstants.INCLUSION_BLACKLIST,
      countryCodes
    );
    return this;
  }

  /**
   * @param {string[]} documentTypes
   */
  withWhitelistedDocumentTypes(documentTypes) {
    this.typeRestriction = new TypeRestriction(
      DocScanConstants.INCLUSION_WHITELIST,
      documentTypes
    );
    return this;
  }

  /**
   * @param {string[]} documentTypes
   */
  withBlacklistedDocumentTypes(documentTypes) {
    this.typeRestriction = new TypeRestriction(
      DocScanConstants.INCLUSION_BLACKLIST,
      documentTypes
    );
    return this;
  }

  /**
   * @returns {OrthogonalRestrictionsFilter}
   */
  build() {
    return new OrthogonalRestrictionsFilter(this.countryRestriction, this.typeRestriction);
  }
}

module.exports = OrthogonalRestrictionsFilterBuilder;
