const ShareCodeLookupProfileResponse = require('../../../../src/idv_service/session/retrieve/share.code.lookup.profile.response');
const MediaResponse = require('../../../../src/idv_service/session/retrieve/media.response');

describe('ShareCodeLookupProfileResponse', () => {
  let shareCodeLookupProfileResponse;

  beforeEach(() => {
    shareCodeLookupProfileResponse = new ShareCodeLookupProfileResponse({ media: {} });
  });

  describe('#getMedia', () => {
    it('should return media', () => {
      expect(shareCodeLookupProfileResponse.getMedia()).toBeInstanceOf(MediaResponse);
    });
  });
});
