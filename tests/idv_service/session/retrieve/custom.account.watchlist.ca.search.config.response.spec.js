const WatchlistAdvancedCaSearchConfigResponse = require('../../../../src/idv_service/session/retrieve/watchlist.advanced.ca.search.config.response');
const CustomAccountWatchlistCaSearchConfigResponse = require('../../../../src/idv_service/session/retrieve/custom.account.watchlist.ca.search.config.response');
const SearchProfileSourcesResponse = require('../../../../src/idv_service/session/retrieve/search.profile.sources.response');
const TypeListSourcesResponse = require('../../../../src/idv_service/session/retrieve/type.list.sources.response');
const ExactMatchingStrategyResponse = require('../../../../src/idv_service/session/retrieve/exact.matching.strategy.response');
const FuzzyMatchingStrategyResponse = require('../../../../src/idv_service/session/retrieve/fuzzy.matching.strategy.response');

describe('CustomAccountWatchlistCaSearchConfigResponse', () => {
  it('is a class that extends WatchlistAdvancedCaSearchConfigResponse', () => {
    expect(CustomAccountWatchlistCaSearchConfigResponse.prototype)
      .toBeInstanceOf(WatchlistAdvancedCaSearchConfigResponse);
  });
  describe('given an instance of the class', () => {
    let customAccountWatchlistCaSearchConfigResponse;

    const minimumResponseBody = {
      type: 'WITH_CUSTOM_ACCOUNT',
      remove_deceased: true,
      share_url: true,
      api_key: 'an-api-key',
      monitoring: true,
      tags: {},
      client_ref: 'an-client-ref',
    };

    describe('with the minimum response body', () => {
      beforeEach(() => {
        // eslint-disable-next-line max-len
        customAccountWatchlistCaSearchConfigResponse = new CustomAccountWatchlistCaSearchConfigResponse(minimumResponseBody);
      });

      it('#getType', () => {
        expect(customAccountWatchlistCaSearchConfigResponse.getType()).toBe('WITH_CUSTOM_ACCOUNT');
      });

      it('#isRemoveDeceased', () => {
        expect(customAccountWatchlistCaSearchConfigResponse.isRemoveDeceased()).toBe(true);
      });

      it('#isShareUrl', () => {
        expect(customAccountWatchlistCaSearchConfigResponse.isShareUrl()).toBe(true);
      });

      it('#getApiKey', () => {
        expect(customAccountWatchlistCaSearchConfigResponse.getApiKey()).toBe('an-api-key');
      });

      it('#isMonitoring', () => {
        expect(customAccountWatchlistCaSearchConfigResponse.isMonitoring()).toBe(true);
      });

      it('#getTags', () => {
        expect(customAccountWatchlistCaSearchConfigResponse.getTags()).toStrictEqual({});
      });

      it('#getClientRef', () => {
        expect(customAccountWatchlistCaSearchConfigResponse.getClientRef()).toBe('an-client-ref');
      });
    });
    describe('with non empty tags in response body', () => {
      beforeEach(() => {
        const response = Object.assign({}, minimumResponseBody, {
          tags: {
            nickname: 'Jack the Ripper',
            classification: 'dangerous',
          },
        });
        // eslint-disable-next-line max-len
        customAccountWatchlistCaSearchConfigResponse = new CustomAccountWatchlistCaSearchConfigResponse(response);
      });

      it('#getTags', () => {
        expect(customAccountWatchlistCaSearchConfigResponse.getTags()).toStrictEqual({
          nickname: 'Jack the Ripper',
          classification: 'dangerous',
        });
      });
    });
    describe('with missing tags in response body', () => {
      beforeEach(() => {
        const response = Object.assign({}, minimumResponseBody);
        delete response.tags;
        // eslint-disable-next-line max-len
        customAccountWatchlistCaSearchConfigResponse = new CustomAccountWatchlistCaSearchConfigResponse(response);
      });

      it('#getTags', () => {
        expect(customAccountWatchlistCaSearchConfigResponse.getTags()).toBe(undefined);
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
          customAccountWatchlistCaSearchConfigResponse = new CustomAccountWatchlistCaSearchConfigResponse(response);
        });

        it('#getSources', () => {
          const sources = customAccountWatchlistCaSearchConfigResponse.getSources();
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
          customAccountWatchlistCaSearchConfigResponse = new CustomAccountWatchlistCaSearchConfigResponse(response);
        });

        it('#getSources', () => {
          const sources = customAccountWatchlistCaSearchConfigResponse.getSources();
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
          customAccountWatchlistCaSearchConfigResponse = new CustomAccountWatchlistCaSearchConfigResponse(response);
        });

        it('#getSources', () => {
          // eslint-disable-next-line max-len
          const matchingStrategy = customAccountWatchlistCaSearchConfigResponse.getMatchingStrategy();
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
          customAccountWatchlistCaSearchConfigResponse = new CustomAccountWatchlistCaSearchConfigResponse(response);
        });

        it('#getSources', () => {
          // eslint-disable-next-line max-len
          const matchingStrategy = customAccountWatchlistCaSearchConfigResponse.getMatchingStrategy();
          expect(matchingStrategy).toBeInstanceOf(FuzzyMatchingStrategyResponse);
          expect(matchingStrategy.getType()).toBe('FUZZY');
          expect(matchingStrategy.getFuzziness()).toBe(0.88);
        });
      });
    });
  });
});
