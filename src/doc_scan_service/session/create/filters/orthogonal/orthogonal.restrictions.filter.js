'use strict';

const Validation = require('../../../../../yoti_common/validation');
const DocumentFilter = require('../document.filter');
const DocScanConstants = require('../../../../doc.scan.constants');
const TypeRestriction = require('./type.restriction');
const CountryRestriction = require('./country.restriction');

class OrthogonalRestrictionsFilter extends DocumentFilter {
  /**
   * @param {CountryRestriction} countryRestriction
   * @param {TypeRestriction} typeRestriction
   */
  constructor(countryRestriction, typeRestriction) {
    super(DocScanConstants.ORTHOGONAL_RESTRICTIONS);

    if (countryRestriction) {
      Validation.instanceOf(countryRestriction, CountryRestriction, 'countryRestriction');
      this.countryRestriction = countryRestriction;
    }

    if (typeRestriction) {
      Validation.instanceOf(typeRestriction, TypeRestriction, 'typeRestriction');
      this.typeRestriction = typeRestriction;
    }
  }

  toJSON() {
    const json = super.toJSON();

    json.country_restriction = this.countryRestriction;
    json.type_restriction = this.typeRestriction;

    return json;
  }
}

module.exports = OrthogonalRestrictionsFilter;
