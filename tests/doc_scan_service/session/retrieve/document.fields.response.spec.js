const DocumentFieldsResponse = require('../../../../src/doc_scan_service/session/retrieve/document.fields.response');
const MediaResponse = require('../../../../src/doc_scan_service/session/retrieve/media.response');

describe('DocumentFieldsResponse', () => {
  let documentFieldsResponse;

  beforeEach(() => {
    documentFieldsResponse = new DocumentFieldsResponse({
      media: {},
    });
  });

  describe('#getMedia', () => {
    it('should return media', () => {
      expect(documentFieldsResponse.getMedia()).toBeInstanceOf(MediaResponse);
    });
  });
});
