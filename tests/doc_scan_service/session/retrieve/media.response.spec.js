const MediaResponse = require('../../../../src/doc_scan_service/session/retrieve/media.response');

describe('MediaResponse', () => {
  let media;

  beforeEach(() => {
    media = new MediaResponse({
      id: 'some-id',
      type: 'some-type',
      created: '2006-01-02T22:04:05.123Z',
      last_updated: '2006-02-02T22:04:05.123Z',
    });
  });

  describe('#getId', () => {
    it('should return ID', () => {
      expect(media.getId()).toBe('some-id');
    });
  });

  describe('#getType', () => {
    it('should return the type', () => {
      expect(media.getType()).toBe('some-type');
    });
  });

  describe('#getCreated', () => {
    it('should return created', () => {
      expect(media.getCreated().getMicrosecondTimestamp())
        .toBe('2006-01-02T22:04:05.123000Z');
    });
  });

  describe('#getLastUpdated', () => {
    it('should return last updated', () => {
      expect(media.getLastUpdated().getMicrosecondTimestamp())
        .toBe('2006-02-02T22:04:05.123000Z');
    });
  });
});
