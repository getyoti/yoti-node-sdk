const RequestedTask = require('../../../../../src/doc_scan_service/session/create/task/requested.task');

describe('RequestedTask', () => {
  it('should throw exception when instantiated directly', () => {
    expect(() => new RequestedTask({})).toThrow(new TypeError('RequestedTask cannot be instantiated'));
  });
});
