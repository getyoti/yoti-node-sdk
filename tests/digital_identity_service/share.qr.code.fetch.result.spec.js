const ShareQrCodeFetchResult = require('../../src/digital_identity_service/share.qr.code.fetch.result');
const ShareSessionCreateResult = require('../../src/digital_identity_service/share.session.create.result');

describe('ShareSessionQrCodeResult', () => {
  let shareQrCodeFetchResult;

  beforeEach(() => {
    shareQrCodeFetchResult = new ShareQrCodeFetchResult({
      id: '',
      expiry: '2023-02-16T11:30:20.432Z',
      session: {
        id: '',
        status: '',
        expiry: '2023-02-16T11:30:20.432Z',
      },
      redirectUri: '',
    });
  });

  describe('#getId', () => {
    it('should return ID', () => {
      expect(shareQrCodeFetchResult.getId()).toBe('');
    });
  });

  describe('#getExpiry', () => {
    it('should return expiry', () => {
      expect(shareQrCodeFetchResult.getExpiry()).toStrictEqual(new Date('2023-02-16T11:30:20.432Z'));
    });
  });

  describe('#getSession', () => {
    it('should return session', () => {
      expect(shareQrCodeFetchResult.getSession()).toBeInstanceOf(ShareSessionCreateResult);
    });
  });

  describe('#getRedirectUri', () => {
    it('should return redirect URI', () => {
      expect(shareQrCodeFetchResult.getRedirectUri()).toBe('');
    });
  });
});
