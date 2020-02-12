
const LivenessResourceResponse = require('../../../../src/doc_scan_service/session/retrieve/liveness.resource.response');

describe('LivenessResourceResponse', () => {
  describe('#constructor', () => {
    it('should throw exception when instantiated directly', () => {
      expect(() => new LivenessResourceResponse({}))
        .toThrow(new Error('LivenessResourceResponse cannot be instantiated'));
    });
  });
});
