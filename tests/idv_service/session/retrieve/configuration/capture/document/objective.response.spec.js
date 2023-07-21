const ObjectiveResponse = require('../../../../../../../src/idv_service/session/retrieve/configuration/capture/document/objective.response');

describe('ObjectiveResponse', () => {
  let objectiveResponse;

  beforeEach(() => {
    objectiveResponse = new ObjectiveResponse({
      type: 'objective',
    });
  });

  describe('#getType', () => {
    it('should return type', () => {
      expect(objectiveResponse.getType()).toBe('objective');
    });
  });
});
