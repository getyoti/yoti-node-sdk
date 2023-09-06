'use strict';

const Validation = require('../../../../../yoti_common/validation');
const DocumentFilter = require('../document.filter');
const IDVConstants = require('../../../../idv.constants');
const TypeRestriction = require('./type.restriction');
const CountryRestriction = require('./country.restriction');

class OrthogonalRestrictionsFilter extends DocumentFilter {
  /**
   * @param {CountryRestriction} countryRestriction
   * @param {TypeRestriction} typeRestriction
   * @param {Boolean} allowExpiredDocuments
   * @param {Boolean} allowNonLatinDocuments
   */
  constructor(countryRestriction, typeRestriction, allowExpiredDocuments, allowNonLatinDocuments) {
    super(IDVConstants.ORTHOGONAL_RESTRICTIONS);

    if (countryRestriction) {
      Validation.instanceOf(countryRestriction, CountryRestriction, 'countryRestriction');
      this.countryRestriction = countryRestriction;
    }

    if (typeRestriction) {
      Validation.instanceOf(typeRestriction, TypeRestriction, 'typeRestriction');
      this.typeRestriction = typeRestriction;
    }

    Validation.isBoolean(allowExpiredDocuments, 'allowExpiredDocuments', true);
    this.allowExpiredDocuments = allowExpiredDocuments;

    Validation.isBoolean(allowNonLatinDocuments, 'allowNonLatinDocuments', true);
    this.allowNonLatinDocuments = allowNonLatinDocuments;
  }

  toJSON() {
    const json = super.toJSON();

    json.country_restriction = this.countryRestriction;
    json.type_restriction = this.typeRestriction;
    json.allow_expired_documents = this.allowExpiredDocuments;
    json.allow_non_latin_documents = this.allowNonLatinDocuments;

    return json;
  }
}

module.exports = OrthogonalRestrictionsFilter;
