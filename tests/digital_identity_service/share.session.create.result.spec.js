const ShareSessionCreateResult = require('../../src/digital_identity_service/share.session.create.result');

describe('ShareSessionCreateResult', () => {
  let shareSessionCreateResult;

  beforeEach(() => {
    shareSessionCreateResult = new ShareSessionCreateResult({
      id: 'some-id',
      status: 'some-status',
      expiry: '2000-03-12',
    });
  });

  describe('#getId', () => {
    it('should return ID', () => {
      expect(shareSessionCreateResult.getId()).toBe('some-id');
    });
  });

  describe('#getStatus', () => {
    it('should return status', () => {
      expect(shareSessionCreateResult.getStatus()).toBe('some-status');
    });
  });

  describe('#getExpiry', () => {
    it('should return state', () => {
      expect(shareSessionCreateResult.getExpiry().toString()).toBe(new Date('2000-03-12').toString());
    });
  });
});
