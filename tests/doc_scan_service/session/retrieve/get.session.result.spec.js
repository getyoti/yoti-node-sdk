const GetSessionResult = require('../../../../src/doc_scan_service/session/retrieve/get.session.result');
const CheckResponse = require('../../../../src/doc_scan_service/session/retrieve/check.response');
const AuthenticityCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/authenticity.check.response');
const FaceMatchCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/face.match.check.response');
const TextDataCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/text.data.check.response');
const SupplementaryDocumentTextDataCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/supplementary.document.text.data.check.response');
const LivenessCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/liveness.check.response');
const ResourceContainer = require('../../../../src/doc_scan_service/session/retrieve/resource.container');
const IdDocumentComparisonCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/id.document.comparison.check.response');
const ThirdPartyIdentityCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/third.party.identity.check.response');
const { YotiDate } = require('../../../..');

const ID_DOCUMENT_AUTHENTICITY = 'ID_DOCUMENT_AUTHENTICITY';
const ID_DOCUMENT_FACE_MATCH = 'ID_DOCUMENT_FACE_MATCH';
const ID_DOCUMENT_TEXT_DATA_CHECK = 'ID_DOCUMENT_TEXT_DATA_CHECK';
const SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK = 'SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK';
const LIVENESS = 'LIVENESS';
const ID_DOCUMENT_COMPARISON = 'ID_DOCUMENT_COMPARISON';
const THIRD_PARTY_IDENTITY = 'THIRD_PARTY_IDENTITY';
const SOME_UNKNOWN_CHECK = 'SOME_UNKNOWN_CHECK';
const SOME_DATE_STRING = '2019-12-02T12:00:00.123Z';

describe('GetSessionResult', () => {
  let session;

  beforeEach(() => {
    session = new GetSessionResult({
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
          type: ID_DOCUMENT_AUTHENTICITY,
        },
        {
          type: LIVENESS,
        },
        {
          type: ID_DOCUMENT_FACE_MATCH,
        },
        {
          type: ID_DOCUMENT_TEXT_DATA_CHECK,
        },
        {
          type: ID_DOCUMENT_COMPARISON,
        },
        {
          type: SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK,
        },
        {
          type: THIRD_PARTY_IDENTITY,
        },
      ],
      biometric_consent: SOME_DATE_STRING,
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
    describe('when checks are available', () => {
      it('should return array of checks', () => {
        const checks = session.getChecks();
        expect(checks.length).toBe(7);
        expect(checks[0]).toBeInstanceOf(AuthenticityCheckResponse);
        expect(checks[1]).toBeInstanceOf(LivenessCheckResponse);
        expect(checks[2]).toBeInstanceOf(FaceMatchCheckResponse);
        expect(checks[3]).toBeInstanceOf(TextDataCheckResponse);
        expect(checks[4]).toBeInstanceOf(IdDocumentComparisonCheckResponse);
        expect(checks[5]).toBeInstanceOf(SupplementaryDocumentTextDataCheckResponse);
        expect(checks[6]).toBeInstanceOf(ThirdPartyIdentityCheckResponse);
        checks.forEach((check) => expect(check).toBeInstanceOf(CheckResponse));
      });
    });
    describe('when checks are not available', () => {
      it('should return empty array', () => {
        session = new GetSessionResult({});
        const checks = session.getChecks();
        expect(checks).toBeInstanceOf(Array);
        expect(checks.length).toBe(0);
      });
    });
  });

  describe('#getAuthenticityChecks', () => {
    it('should return array of AuthenticityCheckResponse', () => {
      const checks = session.getAuthenticityChecks();
      expect(checks.length).toBe(1);
      expect(checks[0]).toBeInstanceOf(AuthenticityCheckResponse);
      expect(checks[0].getType()).toBe(ID_DOCUMENT_AUTHENTICITY);
    });
  });

  describe('#getAuthenticityChecks', () => {
    it('should return array of AuthenticityCheckResponse', () => {
      const checks = session.getIdDocumentComparisonChecks();
      expect(checks.length).toBe(1);
      expect(checks[0]).toBeInstanceOf(IdDocumentComparisonCheckResponse);
      expect(checks[0].getType()).toBe(ID_DOCUMENT_COMPARISON);
    });
  });

  describe('#getLivenessChecks', () => {
    it('should return array of ZoomLivenessCheckResponse', () => {
      const checks = session.getLivenessChecks();
      expect(checks.length).toBe(1);
      expect(checks[0]).toBeInstanceOf(LivenessCheckResponse);
      expect(checks[0].getType()).toBe(LIVENESS);
    });
  });

  describe('#getTextDataChecks', () => {
    it('should return array of TextDataCheckResponse', () => {
      const checks = session.getTextDataChecks();
      expect(checks.length).toBe(1);
      expect(checks[0]).toBeInstanceOf(TextDataCheckResponse);
      expect(checks[0].getType()).toBe(ID_DOCUMENT_TEXT_DATA_CHECK);
    });
  });

  describe('#getIdDocumentTextDataChecks', () => {
    it('should return array of TextDataCheckResponse', () => {
      const checks = session.getIdDocumentTextDataChecks();
      expect(checks.length).toBe(1);
      expect(checks[0]).toBeInstanceOf(TextDataCheckResponse);
      expect(checks[0].getType()).toBe(ID_DOCUMENT_TEXT_DATA_CHECK);
    });
  });

  describe('#getSupplementaryDocumentTextDataChecks', () => {
    it('should return array of SupplementaryDocumentTextDataCheckResponse', () => {
      const checks = session.getSupplementaryDocumentTextDataChecks();
      expect(checks.length).toBe(1);
      expect(checks[0]).toBeInstanceOf(SupplementaryDocumentTextDataCheckResponse);
      expect(checks[0].getType()).toBe(SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK);
    });
  });

  describe('#getThirdPartyIdentityChecks', () => {
    it('should return array of ThirdPartyIdentityCheckResponse', () => {
      const checks = session.getThirdPartyIdentityChecks();
      expect(checks.length).toBe(1);
      expect(checks[0]).toBeInstanceOf(ThirdPartyIdentityCheckResponse);
      expect(checks[0].getType()).toBe(THIRD_PARTY_IDENTITY);
    });
  });

  describe('#getFaceMatchChecks', () => {
    it('should return array of FaceMatchCheckResponse', () => {
      const checks = session.getFaceMatchChecks();
      expect(checks.length).toBe(1);
      expect(checks[0]).toBeInstanceOf(FaceMatchCheckResponse);
      expect(checks[0].getType()).toBe(ID_DOCUMENT_FACE_MATCH);
    });
  });

  describe('#getResources', () => {
    it('should return resource container', () => {
      const resources = session.getResources();
      expect(resources).toBeInstanceOf(ResourceContainer);
    });
  });

  describe('#constructor', () => {
    it('should create default check response for unknown checks', () => {
      session = new GetSessionResult({
        checks: [
          {
            type: SOME_UNKNOWN_CHECK,
          },
        ],
      });

      const checks = session.getChecks();
      expect(checks.length).toBe(1);
      expect(checks[0]).toBeInstanceOf(CheckResponse);
      expect(checks[0].getType()).toBe(SOME_UNKNOWN_CHECK);
    });
  });

  describe('#getBiometricConsentTimestamp', () => {
    it('should return biometric consent timestamp container', () => {
      const biometricConsent = session.getBiometricConsentTimestamp();
      expect(biometricConsent).toBeInstanceOf(YotiDate);
      expect(biometricConsent).toBeInstanceOf(Date);
      expect(biometricConsent.toISOString()).toBe(SOME_DATE_STRING);
    });
  });
});
