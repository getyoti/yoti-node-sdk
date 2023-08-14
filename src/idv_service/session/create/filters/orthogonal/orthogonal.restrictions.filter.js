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
   */
  constructor(countryRestriction, typeRestriction, allowExpiredDocuments) {
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
  }

  toJSON() {
    const json = super.toJSON();

    json.country_restriction = this.countryRestriction;
    json.type_restriction = this.typeRestriction;
    json.allow_expired_documents = this.allowExpiredDocuments;

    return json;
  }
}

module.exports = OrthogonalRestrictionsFilter;
