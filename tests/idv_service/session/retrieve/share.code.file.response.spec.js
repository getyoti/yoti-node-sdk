const ShareCodeFileResponse = require('../../../../src/idv_service/session/retrieve/share.code.file.response');
const MediaResponse = require('../../../../src/idv_service/session/retrieve/media.response');

describe('ShareCodeFileImageResponse', () => {
  let shareCodeFileResponse;

  beforeEach(() => {
    shareCodeFileResponse = new ShareCodeFileResponse({ media: {} });
  });

  describe('#getMedia', () => {
    it('should return media', () => {
      expect(shareCodeFileResponse.getMedia()).toBeInstanceOf(MediaResponse);
    });
  });
});
