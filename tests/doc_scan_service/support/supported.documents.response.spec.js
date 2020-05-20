const SupportedDocumentsResponse = require('../../../src/doc_scan_service/support/supported.documents.response');

const SOME_DOCUMENT_TYPE = 'some-document-type';
const SOME_OTHER_DOCUMENT_TYPE = 'some-other-document-type';
const SOME_COUNTRY_CODE = 'some-country-code';
const SOME_OTHER_COUNTRY_CODE = 'some-other-country-code';

describe('SupportedDocumentsResponse', () => {
  it('parses response into list of supported countries', () => {
    const supportedDocumentsResponse = new SupportedDocumentsResponse({
      supported_countries: [
        {
          code: SOME_COUNTRY_CODE,
          supported_documents: [
            {
              type: SOME_DOCUMENT_TYPE,
            },
          ],
        },
        {
          code: SOME_OTHER_COUNTRY_CODE,
          supported_documents: [
            {
              type: SOME_DOCUMENT_TYPE,
            },
            {
              type: SOME_OTHER_DOCUMENT_TYPE,
            },
          ],
        },
        {
          code: SOME_OTHER_COUNTRY_CODE,
        },
      ],
    });

    const supportedCountries = supportedDocumentsResponse.getSupportedCountries();

    expect(supportedCountries)
      .toHaveLength(3);
    expect(supportedCountries[0].getCode())
      .toBe(SOME_COUNTRY_CODE);
    expect(supportedCountries[0].getSupportedDocuments())
      .toHaveLength(1);
    expect(supportedCountries[0].getSupportedDocuments()[0].getType())
      .toBe(SOME_DOCUMENT_TYPE);

    expect(supportedCountries[1].getCode())
      .toBe(SOME_OTHER_COUNTRY_CODE);
    expect(supportedCountries[1].getSupportedDocuments())
      .toHaveLength(2);
    expect(supportedCountries[1].getSupportedDocuments()[0].getType())
      .toBe(SOME_DOCUMENT_TYPE);
    expect(supportedCountries[1].getSupportedDocuments()[1].getType())
      .toBe(SOME_OTHER_DOCUMENT_TYPE);

    expect(supportedCountries[2].getCode())
      .toBe(SOME_OTHER_COUNTRY_CODE);
    expect(supportedCountries[2].getSupportedDocuments())
      .toHaveLength(0);
  });

  it('returns empty list when supported countries is not returned', () => {
    const supportedDocumentsResponse = new SupportedDocumentsResponse({});
    const supportedCountries = supportedDocumentsResponse.getSupportedCountries();

    expect(supportedCountries).toHaveLength(0);
  });
});
