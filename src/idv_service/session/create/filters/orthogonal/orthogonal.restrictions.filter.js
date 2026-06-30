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
   * @param {boolean} allowDigitalIds
   * @param {AllowedProvider[]} allowedProviders
   */
  constructor(countryRestriction, typeRestriction, allowExpiredDocuments, allowNonLatinDocuments, allowDigitalIds, allowedProviders) {
    super(IDVConstants.ORTHOGONAL_RESTRICTIONS, allowExpiredDocuments, allowNonLatinDocuments, allowDigitalIds, allowedProviders);

    if (countryRestriction) {
      Validation.instanceOf(countryRestriction, CountryRestriction, 'countryRestriction');
      /** @private */
      this.countryRestriction = countryRestriction;
    }

    if (typeRestriction) {
      Validation.instanceOf(typeRestriction, TypeRestriction, 'typeRestriction');
      /** @private */
      this.typeRestriction = typeRestriction;
    }
  }

  toJSON() {
    const json = super.toJSON();

    json.country_restriction = this.countryRestriction;
    json.type_restriction = this.typeRestriction;
    json.allow_expired_documents = this.getAllowExpiredDocuments();
    json.allow_non_latin_documents = this.getAllowNonLatinDocuments();
    json.allow_digital_ids = this.getAllowDigitalIds();
    json.allowed_providers = this.getAllowedProviders();

    return json;
  }
}

module.exports = OrthogonalRestrictionsFilter;
