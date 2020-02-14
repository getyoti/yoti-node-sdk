
const PageResponse = require('../../../../src/doc_scan_service/session/retrieve/page.response');
const MediaResponse = require('../../../../src/doc_scan_service/session/retrieve/media.response');

describe('PageResponse', () => {
  let pageResponse;

  beforeEach(() => {
    pageResponse = new PageResponse({
      capture_method: 'some-capture-method',
      media: {},
    });
  });

  describe('#getCaptureMethod', () => {
    it('should return capture method', () => {
      expect(pageResponse.getCaptureMethod()).toBe('some-capture-method');
    });
  });

  describe('#getMedia', () => {
    it('should return media', () => {
      expect(pageResponse.getMedia()).toBeInstanceOf(MediaResponse);
    });
  });
});
