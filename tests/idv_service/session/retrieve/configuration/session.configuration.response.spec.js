const CaptureResponse = require('../../../../../src/idv_service/session/retrieve/configuration/capture/capture.response');
const SessionConfigurationResponse = require('../../../../../src/idv_service/session/retrieve/configuration/session.configuration.response');

describe('SessionConfigurationResponse', () => {
  let sessionConfigurationResponse;

  beforeEach(() => {
    sessionConfigurationResponse = new SessionConfigurationResponse({
      client_session_token_ttl: 123,
      session_id: 'some_id',
      requested_checks: [
        '',
      ],
      capture: {
        biometric_consent: '',
        required_resources: [],
      },
    });
  });

  describe('#getClientSessionTokenTtl', () => {
    it('should return client session token ttl', () => {
      expect(sessionConfigurationResponse.getClientSessionTokenTtl()).toBe(123);
    });
  });

  describe('#getSessionId', () => {
    it('should return session id', () => {
      expect(sessionConfigurationResponse.getSessionId()).toBe('some_id');
    });
  });

  describe('#getRequestedChecks', () => {
    it('should return requested checks', () => {
      expect(sessionConfigurationResponse.getRequestedChecks()).toHaveLength(1);
    });
  });

  describe('#getCapture', () => {
    it('should return capture', () => {
      expect(sessionConfigurationResponse.getCapture()).toBeInstanceOf(CaptureResponse);
    });
  });
});
