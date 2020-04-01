const Validation = require('../../../../../yoti_common/validation');
const OrthogonalRestrictionsFilter = require('./orthogonal.restrictions.filter');
const TypeRestriction = require('./type.restriction');
const CountryRestriction = require('./country.restriction');

class OrthogonalRestrictionsFilterBuilder {
  withCountryRestriction(countryRestriction) {
    Validation.instanceOf(countryRestriction, CountryRestriction, 'countryRestriction');
    this.countryRestriction = countryRestriction;
    return this;
  }

  withTypeRestriction(typeRestriction) {
    Validation.instanceOf(typeRestriction, TypeRestriction, 'typeRestriction');
    this.typeRestriction = typeRestriction;
    return this;
  }

  build() {
    return new OrthogonalRestrictionsFilter(this.countryRestriction, this.typeRestriction);
  }
}

module.exports = OrthogonalRestrictionsFilterBuilder;
