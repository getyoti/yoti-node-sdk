const CreateShareQrCodeResult = require('../../src/digital_identity_service/create.share.qr.code.result');

describe('CreateShareQrCodeResult', () => {
  let createShareQrCodeResult;

  beforeEach(() => {
    createShareQrCodeResult = new CreateShareQrCodeResult({
      id: 'some-id',
      uri: 'https://test.com',
    });
  });

  describe('#getId', () => {
    it('should return ID', () => {
      expect(createShareQrCodeResult.getId()).toBe('some-id');
    });
  });

  describe('#getUri', () => {
    it('should return URI', () => {
      expect(createShareQrCodeResult.getUri()).toBe('https://test.com');
    });
  });
});
