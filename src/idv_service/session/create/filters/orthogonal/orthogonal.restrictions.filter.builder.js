'use strict';

const OrthogonalRestrictionsFilter = require('./orthogonal.restrictions.filter');
const TypeRestriction = require('./type.restriction');
const CountryRestriction = require('./country.restriction');
const IDVConstants = require('../../../../idv.constants');

class OrthogonalRestrictionsFilterBuilder {
  /**
   * @param {string[]} countryCodes
   *
   * @returns {this}
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
   *
   * @returns {this}
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
   *
   * @returns {this}
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
   *
   * @returns {this}
   */
  withBlacklistedDocumentTypes(documentTypes) {
    this.typeRestriction = new TypeRestriction(
      IDVConstants.INCLUSION_BLACKLIST,
      documentTypes
    );
    return this;
  }

  /**
   * @param {Boolean} allowExpiredDocuments
   *
   * @returns {this}
   */
  withAllowExpiredDocuments(allowExpiredDocuments) {
    this.allowExpiredDocuments = allowExpiredDocuments;
    return this;
  }

  /**
   * @param {Boolean} allowNonLatinDocuments
   *
   * @returns {this}
   */
  withAllowNonLatinDocuments(allowNonLatinDocuments) {
    this.allowNonLatinDocuments = allowNonLatinDocuments;
    return this;
  }

  /**
   * @returns {OrthogonalRestrictionsFilter}
   */
  build() {
    return new OrthogonalRestrictionsFilter(
      this.countryRestriction,
      this.typeRestriction,
      this.allowExpiredDocuments,
      this.allowNonLatinDocuments
    );
  }
}

module.exports = OrthogonalRestrictionsFilterBuilder;
