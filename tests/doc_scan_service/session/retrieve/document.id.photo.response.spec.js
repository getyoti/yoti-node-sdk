const DocumentIdPhotoResponse = require('../../../../src/doc_scan_service/session/retrieve/document.id.photo.response');
const MediaResponse = require('../../../../src/doc_scan_service/session/retrieve/media.response');

describe('DocumentIdPhotoResponse', () => {
  let documentIdPhotoResponse;

  describe('with media', () => {
    beforeEach(() => {
      documentIdPhotoResponse = new DocumentIdPhotoResponse({
        media: {},
      });
    });

    describe('#getMedia', () => {
      it('should return media', () => {
        expect(documentIdPhotoResponse.getMedia()).toBeInstanceOf(MediaResponse);
      });
    });
  });

  describe('without media', () => {
    beforeEach(() => {
      documentIdPhotoResponse = new DocumentIdPhotoResponse({});
    });

    describe('#getMedia', () => {
      it('should return undefined', () => {
        expect(documentIdPhotoResponse.getMedia()).toBeUndefined();
      });
    });
  });
});
