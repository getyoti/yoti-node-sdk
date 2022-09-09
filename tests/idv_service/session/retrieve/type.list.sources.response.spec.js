const CaSourcesResponse = require('../../../../src/idv_service/session/retrieve/ca.sources.response');
const TypeListSourcesResponse = require('../../../../src/idv_service/session/retrieve/type.list.sources.response');

describe('TypeListSourcesResponse', () => {
  it('is a class that extends CaSourcesResponse', () => {
    expect(TypeListSourcesResponse.prototype).toBeInstanceOf(CaSourcesResponse);
  });
  describe('given an instance of the class (exact match is true)', () => {
    let typeListSourcesResponse;

    beforeEach(() => {
      typeListSourcesResponse = new TypeListSourcesResponse({
        type: 'TYPE_LIST',
        types: ['type1', 'type2'],
      });
    });

    it('#getType', () => {
      expect(typeListSourcesResponse.getType()).toBe('TYPE_LIST');
    });

    it('#getTypes', () => {
      expect(typeListSourcesResponse.getTypes()).toStrictEqual(['type1', 'type2']);
    });
  });
});
