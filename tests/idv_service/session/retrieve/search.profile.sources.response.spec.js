const CaSourcesResponse = require('../../../../src/idv_service/session/retrieve/ca.sources.response');
const SearchProfileSourcesResponse = require('../../../../src/idv_service/session/retrieve/search.profile.sources.response');

describe('SearchProfileSourcesResponse', () => {
  it('is a class that extends CaSourcesResponse', () => {
    expect(SearchProfileSourcesResponse.prototype).toBeInstanceOf(CaSourcesResponse);
  });
  describe('given an instance of the class (exact match is true)', () => {
    let searchProfileSourcesResponse;

    beforeEach(() => {
      searchProfileSourcesResponse = new SearchProfileSourcesResponse({
        type: 'PROFILE',
        search_profile: 'some-profile',
      });
    });

    it('#getType', () => {
      expect(searchProfileSourcesResponse.getType()).toBe('PROFILE');
    });

    it('#getSearchProfile', () => {
      expect(searchProfileSourcesResponse.getSearchProfile()).toBe('some-profile');
    });
  });
});
