const Validation = require('../../../../../yoti_common/validation');
const RequiredDocumentFilter = require('../required.document.filter');
const DocScanConstants = require('../../../../doc.scan.constants');
const TypeRestriction = require('./type.restriction');
const CountryRestriction = require('./country.restriction');

class OrthogonalRestrictionsFilter extends RequiredDocumentFilter {
  constructor(countryRestriction, typeRestriction) {
    super(DocScanConstants.ORTHOGONAL_RESTRICTIONS);

    Validation.instanceOf(countryRestriction, CountryRestriction, 'countryRestriction');
    this.countryRestriction = countryRestriction;

    Validation.instanceOf(typeRestriction, TypeRestriction, 'typeRestriction');
    this.typeRestriction = typeRestriction;
  }

  toJSON() {
    const json = super.toJSON();

    json.country_restriction = this.countryRestriction;
    json.type_restriction = this.typeRestriction;

    return json;
  }
}

module.exports = OrthogonalRestrictionsFilter;
