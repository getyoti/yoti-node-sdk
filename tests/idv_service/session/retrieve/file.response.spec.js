const FileResponse = require('../../../../src/idv_service/session/retrieve/file.response');
const MediaResponse = require('../../../../src/idv_service/session/retrieve/media.response');

describe('FileResponse', () => {
  let fileResponse;

  beforeEach(() => {
    fileResponse = new FileResponse({
      media: {},
    });
  });

  describe('#getMedia', () => {
    it('should return media', () => {
      expect(fileResponse.getMedia()).toBeInstanceOf(MediaResponse);
    });
  });
});
