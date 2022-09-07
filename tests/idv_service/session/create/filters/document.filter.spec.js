const DocumentFilter = require('../../../../../src/idv_service/session/create/filters/document.filter');

describe('DocumentFilter', () => {
  it('cannot be instantiated', () => {
    expect(() => new DocumentFilter())
      .toThrow(new TypeError('DocumentFilter cannot be instantiated'));
  });
});
