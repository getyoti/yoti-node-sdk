const ShareCodeIdPhotoResponse = require('../../../../src/idv_service/session/retrieve/share.code.id.photo.response');
const MediaResponse = require('../../../../src/idv_service/session/retrieve/media.response');

describe('ShareCodeIdPhotoResponse', () => {
  let shareCodeIdPhotoResponse;

  beforeEach(() => {
    shareCodeIdPhotoResponse = new ShareCodeIdPhotoResponse({ media: {} });
  });

  describe('#getMedia', () => {
    it('should return media', () => {
      expect(shareCodeIdPhotoResponse.getMedia()).toBeInstanceOf(MediaResponse);
    });
  });
});
