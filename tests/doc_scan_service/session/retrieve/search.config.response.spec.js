const SearchConfigResponse = require('../../../../src/doc_scan_service/session/retrieve/search.config.response');

describe('SearchConfigResponse', () => {
  let searchConfigResponse;

  beforeEach(() => {
    searchConfigResponse = new SearchConfigResponse({
      categories: ['NEWS', 'SPORTS', 'HISTORY'],
    });
  });

  describe('#getCategories', () => {
    it('should return categories', () => {
      expect(searchConfigResponse.getCategories()).toEqual(['NEWS', 'SPORTS', 'HISTORY']);
    });
  });

  describe('#constructor', () => {
    it('should set up empty categories if none present', () => {
      searchConfigResponse = new SearchConfigResponse({});
      expect(searchConfigResponse.getCategories()).toEqual([]);
    });
  });
});
