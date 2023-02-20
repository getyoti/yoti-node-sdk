const ShareQrCodeFetchResult = require('../../src/digital_identity_service/share.qr.code.fetch.result');

describe('ShareSessionQrCodeResult', () => {
  let shareQrCodeFetchResult;

  beforeEach(() => {
    shareQrCodeFetchResult = new ShareQrCodeFetchResult({
      id: 'qr-code-id',
      expiry: '2023-02-16T11:30:20.432Z',
      session: {
        id: 'session-id',
        status: 'CREATED',
        expiry: '2023-02-16T11:30:20.432Z',
      },
      redirectUri: 'https://test.com',
    });
  });

  describe('#getId', () => {
    it('should return ID', () => {
      expect(shareQrCodeFetchResult.getId()).toBe('qr-code-id');
    });
  });

  describe('#getExpiry', () => {
    it('should return expiry', () => {
      expect(shareQrCodeFetchResult.getExpiry()).toStrictEqual(new Date('2023-02-16T11:30:20.432Z'));
    });
  });

  describe('#getSessionId', () => {
    it('should return session ID', () => {
      expect(shareQrCodeFetchResult.getSessionId()).toBe('session-id');
    });
  });

  describe('#getRedirectUri', () => {
    it('should return redirect URI', () => {
      expect(shareQrCodeFetchResult.getRedirectUri()).toBe('https://test.com');
    });
  });
});
