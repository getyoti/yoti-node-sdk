const ShareCodeReturnedProfileResponse = require('../../../../src/idv_service/session/retrieve/share.code.returned.profile.response');
const MediaResponse = require('../../../../src/idv_service/session/retrieve/media.response');

describe('ShareCodeReturnedProfileResponse', () => {
  let shareCodeReturnedProfileResponse;

  beforeEach(() => {
    shareCodeReturnedProfileResponse = new ShareCodeReturnedProfileResponse({ media: {} });
  });

  describe('#getMedia', () => {
    it('should return media', () => {
      expect(shareCodeReturnedProfileResponse.getMedia()).toBeInstanceOf(MediaResponse);
    });
  });
});
