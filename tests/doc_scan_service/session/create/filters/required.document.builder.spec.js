const RequiredDocumentBuilder = require('../../../../../src/doc_scan_service/session/create/filters/required.document.builder');

describe('RequiredDocumentBuilder', () => {
  it('cannot be instantiated', () => {
    expect(() => new RequiredDocumentBuilder())
      .toThrow(new TypeError('RequiredDocumentBuilder cannot be instantiated'));
  });
});
