const RequestedTaskResponse = require('../../../../../../../src/idv_service/session/retrieve/configuration/capture/task/requested.task.response');

class ExtendedRequestedTaskResponse extends RequestedTaskResponse {
  constructor(requestedTask) {
    super();
    this.type = requestedTask.type;
    this.state = requestedTask.state;
  }
}

describe('RequestedTaskResponse', () => {
  let requestedTaskResponse;

  beforeEach(() => {
    requestedTaskResponse = new ExtendedRequestedTaskResponse({
      type: 'ID_DOCUMENT_TEXT_DATA_EXTRACTION',
      state: 'REQUIRED',
    });
  });

  describe('#getType', () => {
    it('should return type', () => {
      expect(requestedTaskResponse.getType()).toBe('ID_DOCUMENT_TEXT_DATA_EXTRACTION');
    });
  });

  describe('#getState', () => {
    it('should return type', () => {
      expect(requestedTaskResponse.getState()).toBe('REQUIRED');
    });
  });
});
