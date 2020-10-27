const Objective = require('../../../../../src/doc_scan_service/session/create/objective/objective');

describe('Objective', () => {
  it('cannot be instantiated', () => {
    expect(() => new Objective())
      .toThrow(new TypeError('Objective cannot be instantiated'));
  });
});
