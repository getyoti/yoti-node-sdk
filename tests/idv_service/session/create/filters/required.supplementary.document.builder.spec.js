const {
  RequiredSupplementaryDocumentBuilder,
  ProofOfAddressObjectiveBuilder,
} = require('../../../../..');

const SUPPLEMENTARY_DOCUMENT = 'SUPPLEMENTARY_DOCUMENT';
const SOME_DOCUMENT_TYPES = ['some-document-type', 'some-other-document-type'];
const SOME_COUNTRY_CODES = ['some-country-code', 'some-other-country-code'];
const SOME_OBJECTIVE = new ProofOfAddressObjectiveBuilder().build();

describe('RequiredSupplementaryDocumentBuilder', () => {
  it('builds RequiredSupplementaryDocument with objective', () => {
    const requiredIdentityDocument = new RequiredSupplementaryDocumentBuilder()
      .withObjective(SOME_OBJECTIVE)
      .build();

    expect(JSON.stringify(requiredIdentityDocument))
      .toBe(JSON.stringify({
        type: SUPPLEMENTARY_DOCUMENT,
        objective: SOME_OBJECTIVE,
      }));
  });

  it('builds RequiredSupplementaryDocument with country codes', () => {
    const requiredDocument = new RequiredSupplementaryDocumentBuilder()
      .withObjective(SOME_OBJECTIVE)
      .withCountryCodes(SOME_COUNTRY_CODES)
      .build();

    expect(JSON.stringify(requiredDocument))
      .toBe(JSON.stringify({
        type: SUPPLEMENTARY_DOCUMENT,
        objective: SOME_OBJECTIVE,
        country_codes: SOME_COUNTRY_CODES,
      }));
  });

  it('builds RequiredSupplementaryDocument with document types', () => {
    const requiredDocument = new RequiredSupplementaryDocumentBuilder()
      .withObjective(SOME_OBJECTIVE)
      .withDocumentTypes(SOME_DOCUMENT_TYPES)
      .build();

    expect(JSON.stringify(requiredDocument))
      .toBe(JSON.stringify({
        type: SUPPLEMENTARY_DOCUMENT,
        objective: SOME_OBJECTIVE,
        document_types: SOME_DOCUMENT_TYPES,
      }));
  });
});
