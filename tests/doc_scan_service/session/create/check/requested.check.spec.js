const RequestedCheck = require('../../../../../src/doc_scan_service/session/create/check/requested.check');

describe('RequestedCheck', () => {
  it('should throw exception when instantiated directly', () => {
    expect(() => new RequestedCheck({})).toThrow(new TypeError('RequestedCheck cannot be instantiated'));
  });
});
