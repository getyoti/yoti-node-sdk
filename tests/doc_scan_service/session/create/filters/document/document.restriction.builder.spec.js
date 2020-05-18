const { DocumentRestrictionBuilder } = require('../../../../../..');
const DocumentRestriction = require('../../../../../../src/doc_scan_service/session/create/filters/document/document.restriction');

const SOME_DOCUMENT_TYPE = 'some-document-type';
const SOME_OTHER_DOCUMENT_TYPE = 'some-other-document-type';
const SOME_COUNTRY_CODE = 'some-country-code';
const SOME_OTHER_COUNTRY_CODE = 'some-other-country-code';

describe('DocumentRestrictionBuilder', () => {
  it('should build DocumentRestriction', () => {
    const documentRestriction = new DocumentRestrictionBuilder().build();
    expect(documentRestriction).toBeInstanceOf(DocumentRestriction);
  });

  it('should build DocumentRestriction with document types', () => {
    const documentRestriction = new DocumentRestrictionBuilder()
      .withDocumentTypes([
        SOME_DOCUMENT_TYPE,
        SOME_OTHER_DOCUMENT_TYPE,
      ])
      .build();

    expect(JSON.stringify(documentRestriction))
      .toBe(JSON.stringify({
        document_types: [
          SOME_DOCUMENT_TYPE,
          SOME_OTHER_DOCUMENT_TYPE,
        ],
      }));
  });

  it('should build DocumentRestriction with country codes', () => {
    const documentRestriction = new DocumentRestrictionBuilder()
      .withCountries([
        SOME_COUNTRY_CODE,
        SOME_OTHER_COUNTRY_CODE,
      ])
      .build();

    expect(JSON.stringify(documentRestriction))
      .toBe(JSON.stringify({
        country_codes: [
          SOME_COUNTRY_CODE,
          SOME_OTHER_COUNTRY_CODE,
        ],
      }));
  });
  it('should build DocumentRestriction with document type and country code', () => {
    const documentRestriction = new DocumentRestrictionBuilder()
      .withCountries([SOME_COUNTRY_CODE])
      .withDocumentTypes([SOME_DOCUMENT_TYPE])
      .build();

    expect(JSON.stringify(documentRestriction))
      .toBe(JSON.stringify({
        document_types: [
          SOME_DOCUMENT_TYPE,
        ],
        country_codes: [
          SOME_COUNTRY_CODE,
        ],
      }));
  });

  it('should allow empty country list', () => {
    const documentRestriction = new DocumentRestrictionBuilder()
      .withCountries([])
      .build();

    expect(JSON.stringify(documentRestriction))
      .toBe(JSON.stringify({
        country_codes: [],
      }));
  });

  it('should allow empty document type list', () => {
    const documentRestriction = new DocumentRestrictionBuilder()
      .withDocumentTypes([])
      .build();

    expect(JSON.stringify(documentRestriction))
      .toBe(JSON.stringify({
        document_types: [],
      }));
  });
});
