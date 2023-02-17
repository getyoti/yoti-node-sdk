const ShareQrCodeCreateResult = require('../../src/digital_identity_service/share.qr.code.create.result');

describe('ShareSessionQrCodeResult', () => {
  let shareQrCodeCreateResult;

  beforeEach(() => {
    shareQrCodeCreateResult = new ShareQrCodeCreateResult({
      id: 'some-id',
      uri: 'https://test.com',
    });
  });

  describe('#getId', () => {
    it('should return ID', () => {
      expect(shareQrCodeCreateResult.getId()).toBe('some-id');
    });
  });

  describe('#getUri', () => {
    it('should return URI', () => {
      expect(shareQrCodeCreateResult.getUri()).toBe('https://test.com');
    });
  });
});
