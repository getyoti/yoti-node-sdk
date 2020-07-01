/**
 * Reloads yoti config module with current environment variables.
 */
function getYotiConfig() {
  // eslint-disable-next-line global-require
  return require('../../config').yoti;
}

describe('Yoti Config', () => {
  let yotiConfig = getYotiConfig();
  const INITIAL_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = Object.assign({}, INITIAL_ENV);
  });

  afterEach(() => {
    process.env = INITIAL_ENV;
  });

  describe('connectApi', () => {
    it('should default to production API URL', () => {
      expect(yotiConfig.connectApi).toBe('https://api.yoti.com/api/v1');
    });

    it('should use YOTI_CONNECT_API environment variable', () => {
      process.env.YOTI_CONNECT_API = 'some-api-url';
      yotiConfig = getYotiConfig();
      expect(yotiConfig.connectApi).toBe('some-api-url');
    });

    it('should use YOTI_API_URL environment variable', () => {
      process.env.YOTI_API_URL = 'some-other-api-url';
      yotiConfig = getYotiConfig();
      expect(yotiConfig.connectApi).toBe('some-other-api-url');
    });
  });

  describe('docScanApi', () => {
    it('should default to production DOC SCAN API URL', () => {
      expect(yotiConfig.docScanApi).toBe('https://api.yoti.com/idverify/v1');
    });

    it('should use YOTI_DOC_SCAN_API environment variable', () => {
      process.env.YOTI_DOC_SCAN_API = 'some-doc-scan-url';
      yotiConfig = getYotiConfig();
      expect(yotiConfig.docScanApi).toBe('some-doc-scan-url');
    });

    it('should use YOTI_DOC_SCAN_API_URL environment variable', () => {
      process.env.YOTI_DOC_SCAN_API_URL = 'some-other-doc-scan-url';
      yotiConfig = getYotiConfig();
      expect(yotiConfig.docScanApi).toBe('some-other-doc-scan-url');
    });
  });
});
