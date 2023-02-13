const ShareSessionFetchResult = require('../../src/digital_identity_service/share.session.fetch.result');

describe('ShareSessionFetchResult', () => {
  let shareSessionFetchResult;

  beforeEach(() => {
    shareSessionFetchResult = new ShareSessionFetchResult({
      id: '123',
      status: 'some-status',
      created: '2023-02-01',
      updated: '2023-02-01',
      expiry: '2023-02-03',
      qrCode: {
        id: '1',
      },
      receipt: {
        id: '2',
      },
    });
  });

  describe('#getId', () => {
    it('should return id', () => {
      expect(shareSessionFetchResult.getId()).toBe('123');
    });
  });

  describe('#getStatus', () => {
    it('should return status', () => {
      expect(shareSessionFetchResult.getStatus()).toBe('some-status');
    });
  });

  describe('#getExpiry', () => {
    it('should return expiry', () => {
      expect(shareSessionFetchResult.getExpiry().toString()).toBe(new Date('2023-02-03').toString());
    });
  });

  describe('#getUpdated', () => {
    it('should return updated', () => {
      expect(shareSessionFetchResult.getUpdated().toString()).toBe(new Date('2023-02-01').toString());
    });
  });

  describe('#getCreated', () => {
    it('should return created', () => {
      expect(shareSessionFetchResult.getCreated().toString()).toBe(new Date('2023-02-01').toString());
    });
  });

  describe('#getQrCode', () => {
    it('should return qrCode', () => {
      expect(shareSessionFetchResult.getQrCode()).toEqual({ id: '1' });
    });
  });

  describe('#getReceipt', () => {
    it('should return receipt', () => {
      expect(shareSessionFetchResult.getReceipt()).toEqual({ id: '2' });
    });
  });
});
