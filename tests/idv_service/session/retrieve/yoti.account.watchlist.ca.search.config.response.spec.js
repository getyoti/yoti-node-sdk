const WatchlistAdvancedCaSearchConfigResponse = require('../../../../src/idv_service/session/retrieve/watchlist.advanced.ca.search.config.response');
const YotiAccountWatchlistCaSearchConfigResponse = require('../../../../src/idv_service/session/retrieve/yoti.account.watchlist.ca.search.config.response');
const SearchProfileSourcesResponse = require('../../../../src/idv_service/session/retrieve/search.profile.sources.response');
const TypeListSourcesResponse = require('../../../../src/idv_service/session/retrieve/type.list.sources.response');
const ExactMatchingStrategyResponse = require('../../../../src/idv_service/session/retrieve/exact.matching.strategy.response');
const FuzzyMatchingStrategyResponse = require('../../../../src/idv_service/session/retrieve/fuzzy.matching.strategy.response');

describe('YotiAccountWatchlistCaSearchConfigResponse', () => {
  it('is a class that extends WatchlistAdvancedCaSearchConfigResponse', () => {
    // eslint-disable-next-line max-len
    expect(YotiAccountWatchlistCaSearchConfigResponse.prototype).toBeInstanceOf(WatchlistAdvancedCaSearchConfigResponse);
  });
  describe('given an instance of the class', () => {
    let yotiAccountWatchlistCaSearchConfigResponse;

    const minimumResponseBody = {
      type: 'WITH_YOTI_ACCOUNT',
      remove_deceased: true,
      share_url: true,
    };

    describe('with the minimum response body', () => {
      beforeEach(() => {
        // eslint-disable-next-line max-len
        yotiAccountWatchlistCaSearchConfigResponse = new YotiAccountWatchlistCaSearchConfigResponse(minimumResponseBody);
      });

      it('#getType', () => {
        expect(yotiAccountWatchlistCaSearchConfigResponse.getType()).toBe('WITH_YOTI_ACCOUNT');
      });

      it('#isRemoveDeceased', () => {
        expect(yotiAccountWatchlistCaSearchConfigResponse.isRemoveDeceased()).toBe(true);
      });

      it('#isShareUrl', () => {
        expect(yotiAccountWatchlistCaSearchConfigResponse.isShareUrl()).toBe(true);
      });
    });
    describe('with sources in response body', () => {
      describe('of type PROFILE', () => {
        beforeEach(() => {
          const response = Object.assign({}, minimumResponseBody, {
            sources: {
              type: 'PROFILE',
              search_profile: 'the-profile-being-search-for',
            },
          });
          // eslint-disable-next-line max-len
          yotiAccountWatchlistCaSearchConfigResponse = new YotiAccountWatchlistCaSearchConfigResponse(response);
        });

        it('#getSources', () => {
          const sources = yotiAccountWatchlistCaSearchConfigResponse.getSources();
          expect(sources).toBeInstanceOf(SearchProfileSourcesResponse);
          expect(sources.getType()).toBe('PROFILE');
          expect(sources.getSearchProfile()).toBe('the-profile-being-search-for');
        });
      });
      describe('of type TYPE_LIST', () => {
        beforeEach(() => {
          const response = Object.assign({}, minimumResponseBody, {
            sources: {
              type: 'TYPE_LIST',
              types: ['type1', 'type2'],
            },
          });
          // eslint-disable-next-line max-len
          yotiAccountWatchlistCaSearchConfigResponse = new YotiAccountWatchlistCaSearchConfigResponse(response);
        });

        it('#getSources', () => {
          const sources = yotiAccountWatchlistCaSearchConfigResponse.getSources();
          expect(sources).toBeInstanceOf(TypeListSourcesResponse);
          expect(sources.getType()).toBe('TYPE_LIST');
          expect(sources.getTypes()).toStrictEqual(['type1', 'type2']);
        });
      });
    });
    describe('with matching strategy in response body', () => {
      describe('of type EXACT', () => {
        beforeEach(() => {
          const response = Object.assign({}, minimumResponseBody, {
            matching_strategy: {
              type: 'EXACT',
              exact_match: true,
            },
          });
          // eslint-disable-next-line max-len
          yotiAccountWatchlistCaSearchConfigResponse = new YotiAccountWatchlistCaSearchConfigResponse(response);
        });

        it('#getSources', () => {
          const matchingStrategy = yotiAccountWatchlistCaSearchConfigResponse.getMatchingStrategy();
          expect(matchingStrategy).toBeInstanceOf(ExactMatchingStrategyResponse);
          expect(matchingStrategy.getType()).toBe('EXACT');
          expect(matchingStrategy.isExactMatch()).toBe(true);
        });
      });
      describe('of type FUZZY', () => {
        beforeEach(() => {
          const response = Object.assign({}, minimumResponseBody, {
            matching_strategy: {
              type: 'FUZZY',
              fuzziness: 0.88,
            },
          });
          // eslint-disable-next-line max-len
          yotiAccountWatchlistCaSearchConfigResponse = new YotiAccountWatchlistCaSearchConfigResponse(response);
        });

        it('#getSources', () => {
          const matchingStrategy = yotiAccountWatchlistCaSearchConfigResponse.getMatchingStrategy();
          expect(matchingStrategy).toBeInstanceOf(FuzzyMatchingStrategyResponse);
          expect(matchingStrategy.getType()).toBe('FUZZY');
          expect(matchingStrategy.getFuzziness()).toBe(0.88);
        });
      });
    });
  });
});
