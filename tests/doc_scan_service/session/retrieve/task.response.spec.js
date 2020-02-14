
const TaskResponse = require('../../../../src/doc_scan_service/session/retrieve/task.response');

describe('TaskResponse', () => {
  describe('#constructor', () => {
    it('should throw exception when instantiated directly', () => {
      expect(() => new TaskResponse({}))
        .toThrow(new Error('TaskResponse cannot be instantiated'));
    });
  });
});
