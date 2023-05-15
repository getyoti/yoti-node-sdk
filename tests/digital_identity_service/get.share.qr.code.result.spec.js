const GetShareQrCodeResult = require('../../src/digital_identity_service/get.share.qr.code.result');

describe('GetShareQrCodeResult', () => {
  let getShareQrCodeFetchResult;

  beforeEach(() => {
    getShareQrCodeFetchResult = new GetShareQrCodeResult({
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
      expect(getShareQrCodeFetchResult.getId()).toBe('qr-code-id');
    });
  });

  describe('#getExpiry', () => {
    it('should return expiry', () => {
      expect(getShareQrCodeFetchResult.getExpiry()).toStrictEqual(new Date('2023-02-16T11:30:20.432Z'));
    });
  });

  describe('#getSessionId', () => {
    it('should return session ID', () => {
      expect(getShareQrCodeFetchResult.getSessionId()).toBe('session-id');
    });
  });

  describe('#getRedirectUri', () => {
    it('should return redirect URI', () => {
      expect(getShareQrCodeFetchResult.getRedirectUri()).toBe('https://test.com');
    });
  });
});
