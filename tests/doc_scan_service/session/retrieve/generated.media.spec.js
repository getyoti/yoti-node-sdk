const GeneratedMedia = require('../../../../src/doc_scan_service/session/retrieve/generated.media');

describe('GeneratedMedia', () => {
  let generatedMedia;

  beforeEach(() => {
    generatedMedia = new GeneratedMedia({
      id: 'some-id',
      type: 'some-type',
    });
  });

  describe('#getId', () => {
    it('should return ID', () => {
      expect(generatedMedia.getId()).toBe('some-id');
    });
  });

  describe('#getType', () => {
    it('should return the type', () => {
      expect(generatedMedia.getType()).toBe('some-type');
    });
  });
});
