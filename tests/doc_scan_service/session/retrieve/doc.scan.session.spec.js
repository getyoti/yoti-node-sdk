const DocScanSession = require('../../../../src/doc_scan_service/session/retrieve/doc.scan.session');
const CheckResponse = require('../../../../src/doc_scan_service/session/retrieve/check.response');
const AuthenticityCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/authenticity.check.response');
const FaceMatchCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/face.match.check.response');
const TextDataCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/text.data.check.response');
const ZoomLivenessCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/zoom.liveness.check.response');
const ResourceContainer = require('../../../../src/doc_scan_service/session/retrieve/resource.container');

describe('DocScanSession', () => {
  let session;

  beforeEach(() => {
    session = new DocScanSession({
      client_session_token_ttl: 599,
      session_id: 'some-session-id',
      user_tracking_id: 'some-user-id',
      state: 'some-state',
      client_session_token: 'some-token',
      resources: {
        id_documents: [],
        liveness_capture: [],
      },
      checks: [
        {
          type: 'ID_DOCUMENT_AUTHENTICITY',
        },
        {
          type: 'LIVENESS',
        },
        {
          type: 'ID_DOCUMENT_FACE_MATCH',
        },
        {
          type: 'ID_DOCUMENT_TEXT_DATA_CHECK',
        },
      ],
    });
  });

  describe('#getSessionId', () => {
    it('should return client session ID', () => {
      expect(session.getSessionId()).toBe('some-session-id');
    });
  });

  describe('#getUserTrackingId', () => {
    it('should return user tracking ID', () => {
      expect(session.getUserTrackingId()).toBe('some-user-id');
    });
  });

  describe('#getState', () => {
    it('should return the state', () => {
      expect(session.getState()).toBe('some-state');
    });
  });

  describe('#getClientSessionTokenTtl', () => {
    it('should return client session token TTL', () => {
      expect(session.getClientSessionTokenTtl()).toBe(599);
    });
  });

  describe('#getClientSessionToken', () => {
    it('should return client session token', () => {
      expect(session.getClientSessionToken()).toBe('some-token');
    });
  });

  describe('#getChecks', () => {
    it('should return array of checks', () => {
      const checks = session.getChecks();
      expect(checks.length).toBe(4);
      expect(checks[0]).toBeInstanceOf(AuthenticityCheckResponse);
      expect(checks[1]).toBeInstanceOf(ZoomLivenessCheckResponse);
      expect(checks[2]).toBeInstanceOf(TextDataCheckResponse);
      expect(checks[3]).toBeInstanceOf(FaceMatchCheckResponse);
      checks.forEach(check => expect(check).toBeInstanceOf(CheckResponse));
    });
  });

  describe('#getResources', () => {
    it('should return array of resources', () => {
      const resources = session.getResources();
      expect(resources).toBeInstanceOf(ResourceContainer);
    });
  });

  describe('#constructor', () => {
    it('should create default check response for unknown checks', () => {
      session = new DocScanSession({
        checks: [
          {
            type: 'SOME_UNKNOWN_CHECK',
          },
        ],
      });

      const checks = session.getChecks();
      expect(checks.length).toBe(1);
      expect(checks[0]).toBeInstanceOf(CheckResponse);
    });
  });
});
