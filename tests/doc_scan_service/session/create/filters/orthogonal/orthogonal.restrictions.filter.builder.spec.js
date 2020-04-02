const {
  OrthogonalRestrictionsFilterBuilder,
  TypeRestrictionBuilder,
  CountryRestrictionBuilder,
} = require('../../../../../..');

const SOME_COUNTRY_RESTRICTION = new CountryRestrictionBuilder()
  .forWhitelist()
  .build();
const SOME_TYPE_RESTRICTION = new TypeRestrictionBuilder()
  .forWhitelist()
  .build();

describe('OrthogonalRestrictionsFilterBuilder', () => {
  it('should build OrthogonalRestrictionsFilter', () => {
    const orthogonalRestrictionsFilter = new OrthogonalRestrictionsFilterBuilder().build();

    expect(JSON.stringify(orthogonalRestrictionsFilter))
      .toBe(JSON.stringify({
        type: 'ORTHOGONAL_RESTRICTIONS',
      }));
  });

  it('should build OrthogonalRestrictionsFilter with country restriction', () => {
    const orthogonalRestrictionsFilter = new OrthogonalRestrictionsFilterBuilder()
      .withCountryRestriction(SOME_COUNTRY_RESTRICTION)
      .build();

    expect(JSON.stringify(orthogonalRestrictionsFilter))
      .toBe(JSON.stringify({
        type: 'ORTHOGONAL_RESTRICTIONS',
        country_restriction: SOME_COUNTRY_RESTRICTION,
      }));
  });

  it('should build OrthogonalRestrictionsFilter with type restriction', () => {
    const orthogonalRestrictionsFilter = new OrthogonalRestrictionsFilterBuilder()
      .withTypeRestriction(SOME_TYPE_RESTRICTION)
      .build();

    expect(JSON.stringify(orthogonalRestrictionsFilter))
      .toBe(JSON.stringify({
        type: 'ORTHOGONAL_RESTRICTIONS',
        type_restriction: SOME_TYPE_RESTRICTION,
      }));
  });

  it('should build OrthogonalRestrictionsFilter with type and country restrictions', () => {
    const orthogonalRestrictionsFilter = new OrthogonalRestrictionsFilterBuilder()
      .withTypeRestriction(SOME_TYPE_RESTRICTION)
      .withCountryRestriction(SOME_COUNTRY_RESTRICTION)
      .build();

    expect(JSON.stringify(orthogonalRestrictionsFilter))
      .toBe(JSON.stringify({
        type: 'ORTHOGONAL_RESTRICTIONS',
        country_restriction: SOME_COUNTRY_RESTRICTION,
        type_restriction: SOME_TYPE_RESTRICTION,
      }));
  });
});
