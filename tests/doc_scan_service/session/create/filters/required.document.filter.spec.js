const RequiredDocumentFilter = require('../../../../../src/doc_scan_service/session/create/filters/required.document.filter');

describe('RequiredDocumentFilter', () => {
  it('cannot be instantiated', () => {
    expect(() => new RequiredDocumentFilter())
      .toThrow(new TypeError('RequiredDocumentFilter cannot be instantiated'));
  });
});
