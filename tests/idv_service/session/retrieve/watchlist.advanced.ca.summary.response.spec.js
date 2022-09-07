const RawResultsResponse = require('../../../../src/idv_service/session/retrieve/raw.results.response');
const YotiAccountWatchlistCaSearchConfigResponse = require('../../../../src/idv_service/session/retrieve/yoti.account.watchlist.ca.search.config.response');
const CustomAccountWatchlistCaSearchConfigResponse = require('../../../../src/idv_service/session/retrieve/custom.account.watchlist.ca.search.config.response');
const WatchlistSummaryResponse = require('../../../../src/idv_service/session/retrieve/watchlist.summary.response');
const WatchlistAdvancedCaSummaryResponse = require('../../../../src/idv_service/session/retrieve/watchlist.advanced.ca.summary.response');

describe('WatchlistAdvancedCaSummaryResponse', () => {
  it('is a class that extends WatchlistSummaryResponse', () => {
    expect(WatchlistAdvancedCaSummaryResponse.prototype).toBeInstanceOf(WatchlistSummaryResponse);
  });

  describe('given an instance of the class (with no searchConfig)', () => {
    let watchlistAdvancedCaSummaryResponse;
    const baseSummaryBody = {
      total_hits: 9,
      associated_country_codes: ['USA', 'GBR'],
      raw_results: {
        media: {},
      },
    };

    describe('with no searchConfig', () => {
      beforeEach(() => {
        // eslint-disable-next-line max-len
        watchlistAdvancedCaSummaryResponse = new WatchlistAdvancedCaSummaryResponse(baseSummaryBody);
      });

      describe('#getTotalHits', () => {
        it('should return the total hits', () => {
          expect(watchlistAdvancedCaSummaryResponse.getTotalHits()).toBe(9);
        });
      });

      describe('#getAssociatedCountryCodes', () => {
        it('should return the list of associated country codes', () => {
          expect(watchlistAdvancedCaSummaryResponse.getAssociatedCountryCodes()).toEqual(['USA', 'GBR']);
        });
      });

      describe('#getRawResults', () => {
        it('should return the raw results response', () => {
          // eslint-disable-next-line max-len
          expect(watchlistAdvancedCaSummaryResponse.getRawResults()).toBeInstanceOf(RawResultsResponse);
        });
      });
    });

    describe('with a Yoti account searchConfig', () => {
      beforeEach(() => {
        const summaryBody = Object.assign({}, baseSummaryBody, {
          search_config: {
            type: 'WITH_YOTI_ACCOUNT',
            remove_deceased: true,
            share_url: true,
          },
        });
        // eslint-disable-next-line max-len
        watchlistAdvancedCaSummaryResponse = new WatchlistAdvancedCaSummaryResponse(summaryBody);
      });

      describe('#getSearchConfig', () => {
        it('should return the search config response as an instance of the Yoti account searchConfig', () => {
          expect(watchlistAdvancedCaSummaryResponse.getSearchConfig())
            .toBeInstanceOf(YotiAccountWatchlistCaSearchConfigResponse);
        });
      });
    });

    describe('with a custom account searchConfig', () => {
      beforeEach(() => {
        const summaryBody = Object.assign({}, baseSummaryBody, {
          search_config: {
            type: 'WITH_CUSTOM_ACCOUNT',
            remove_deceased: true,
            share_url: true,
            api_key: 'a-key',
            monitoring: true,
            tags: {},
            client_ref: 'a-ref',
          },
        });
        // eslint-disable-next-line max-len
        watchlistAdvancedCaSummaryResponse = new WatchlistAdvancedCaSummaryResponse(summaryBody);
      });

      describe('#getSearchConfig', () => {
        it('should return the search config response as an instance of the custom account searchConfig', () => {
          expect(watchlistAdvancedCaSummaryResponse.getSearchConfig())
            .toBeInstanceOf(CustomAccountWatchlistCaSearchConfigResponse);
        });
      });
    });
  });
});
