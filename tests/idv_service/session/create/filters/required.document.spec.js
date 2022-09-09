const RequiredDocument = require('../../../../../src/idv_service/session/create/filters/required.document');

describe('RequiredDocument', () => {
  it('cannot be instantiated', () => {
    expect(() => new RequiredDocument())
      .toThrow(new TypeError('RequiredDocument cannot be instantiated'));
  });
});
