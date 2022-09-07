const RawResultsResponse = require('../../../../src/idv_service/session/retrieve/raw.results.response');
const MediaResponse = require('../../../../src/idv_service/session/retrieve/media.response');

describe('RawResultsResponse', () => {
  let rawResultsResponse;

  beforeEach(() => {
    rawResultsResponse = new RawResultsResponse({
      media: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        type: 'JSON',
        created: '2021-02-16T17:02:53.519Z',
        last_updated: '2021-02-16T17:02:53.519Z',
      },
    });
  });

  describe('#getMedia', () => {
    it('should return media', () => {
      expect(rawResultsResponse.getMedia()).toBeInstanceOf(MediaResponse);
    });
  });
});
