
const MediaResponse = require('../../../../src/doc_scan_service/session/retrieve/media.response');

describe('MediaResponse', () => {
  let media;

  beforeEach(() => {
    media = new MediaResponse({
      id: 'some-id',
      type: 'some-type',
      created: 'some-created',
      last_updated: 'some-last-updated',
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
      expect(media.getCreated()).toBe('some-created');
    });
  });

  describe('#getLastUpdated', () => {
    it('should return last updated', () => {
      expect(media.getLastUpdated()).toBe('some-last-updated');
    });
  });
});
