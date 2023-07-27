const AllowedSourceResponse = require('../../../../src/idv_service/session/retrieve/allowed.source.response');

describe('AllowedSourceResponse', () => {
  let extendedAllowedSourceResponse;

  beforeEach(() => {
    class ExtendedAllowedSourceResponse extends AllowedSourceResponse {
      constructor(type) {
        super();
        this.type = type;
      }
    }

    extendedAllowedSourceResponse = new ExtendedAllowedSourceResponse('one');
  });

  describe('#getType', () => {
    it('should return type', () => {
      expect(extendedAllowedSourceResponse.getType()).toBe('one');
    });
  });
});
