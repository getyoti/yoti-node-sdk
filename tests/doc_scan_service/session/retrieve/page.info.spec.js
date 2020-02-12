
const PageInfo = require('../../../../src/doc_scan_service/session/retrieve/page.info');
const MediaResponse = require('../../../../src/doc_scan_service/session/retrieve/media.response');

describe('PageInfo', () => {
  let pageInfo;

  beforeEach(() => {
    pageInfo = new PageInfo({
      capture_method: 'some-capture-method',
      media: {},
    });
  });

  describe('#getCaptureMethod', () => {
    it('should return capture method', () => {
      expect(pageInfo.getCaptureMethod()).toBe('some-capture-method');
    });
  });

  describe('#getMedia', () => {
    it('should return media', () => {
      expect(pageInfo.getMedia()).toBeInstanceOf(MediaResponse);
    });
  });
});
