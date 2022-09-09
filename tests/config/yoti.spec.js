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

  describe('idvApi', () => {
    it('should default to production IDV API URL', () => {
      expect(yotiConfig.idvApi).toBe('https://api.yoti.com/idverify/v1');
    });

    it('should use YOTI_IDV_API environment variable', () => {
      process.env.YOTI_IDV_API = 'some-idv-url';
      yotiConfig = getYotiConfig();
      expect(yotiConfig.idvApi).toBe('some-idv-url');
    });

    it('should use YOTI_IDV_API_URL environment variable', () => {
      process.env.YOTI_IDV_API_URL = 'some-other-idv-url';
      yotiConfig = getYotiConfig();
      expect(yotiConfig.idvApi).toBe('some-other-idv-url');
    });
  });
});
