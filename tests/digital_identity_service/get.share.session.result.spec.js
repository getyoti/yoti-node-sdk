const GetShareSessionResult = require('../../src/digital_identity_service/get.share.session.result');

describe('GetShareSessionResult', () => {
  let getShareSessionResult;

  beforeEach(() => {
    getShareSessionResult = new GetShareSessionResult({
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
      expect(getShareSessionResult.getId()).toBe('123');
    });
  });

  describe('#getStatus', () => {
    it('should return status', () => {
      expect(getShareSessionResult.getStatus()).toBe('some-status');
    });
  });

  describe('#getExpiry', () => {
    it('should return expiry', () => {
      expect(getShareSessionResult.getExpiry().toString()).toBe(new Date('2023-02-03').toString());
    });
  });

  describe('#getUpdated', () => {
    it('should return updated', () => {
      expect(getShareSessionResult.getUpdated().toString()).toBe(new Date('2023-02-01').toString());
    });
  });

  describe('#getCreated', () => {
    it('should return created', () => {
      expect(getShareSessionResult.getCreated().toString()).toBe(new Date('2023-02-01').toString());
    });
  });

  describe('#getScannedQrCodeId', () => {
    it('should return qrCode id', () => {
      expect(getShareSessionResult.getScannedQrCodeId()).toEqual('1');
    });
  });

  describe('#getReceiptId', () => {
    it('should return receipt id', () => {
      expect(getShareSessionResult.getReceiptId()).toEqual('2');
    });
  });
});
