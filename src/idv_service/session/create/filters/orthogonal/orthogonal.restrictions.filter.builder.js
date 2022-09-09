'use strict';

const OrthogonalRestrictionsFilter = require('./orthogonal.restrictions.filter');
const TypeRestriction = require('./type.restriction');
const CountryRestriction = require('./country.restriction');
const IDVConstants = require('../../../../idv.constants');

class OrthogonalRestrictionsFilterBuilder {
  /**
   * @param {string[]} countryCodes
   */
  withWhitelistedCountries(countryCodes) {
    this.countryRestriction = new CountryRestriction(
      IDVConstants.INCLUSION_WHITELIST,
      countryCodes
    );
    return this;
  }

  /**
   * @param {string[]} countryCodes
   */
  withBlacklistedCountries(countryCodes) {
    this.countryRestriction = new CountryRestriction(
      IDVConstants.INCLUSION_BLACKLIST,
      countryCodes
    );
    return this;
  }

  /**
   * @param {string[]} documentTypes
   */
  withWhitelistedDocumentTypes(documentTypes) {
    this.typeRestriction = new TypeRestriction(
      IDVConstants.INCLUSION_WHITELIST,
      documentTypes
    );
    return this;
  }

  /**
   * @param {string[]} documentTypes
   */
  withBlacklistedDocumentTypes(documentTypes) {
    this.typeRestriction = new TypeRestriction(
      IDVConstants.INCLUSION_BLACKLIST,
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
