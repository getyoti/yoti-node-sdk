const GetSessionResult = require('../../../../src/idv_service/session/retrieve/get.session.result');
const CheckResponse = require('../../../../src/idv_service/session/retrieve/check.response');
const AuthenticityCheckResponse = require('../../../../src/idv_service/session/retrieve/authenticity.check.response');
const FaceMatchCheckResponse = require('../../../../src/idv_service/session/retrieve/face.match.check.response');
const TextDataCheckResponse = require('../../../../src/idv_service/session/retrieve/text.data.check.response');
const SupplementaryDocumentTextDataCheckResponse = require('../../../../src/idv_service/session/retrieve/supplementary.document.text.data.check.response');
const LivenessCheckResponse = require('../../../../src/idv_service/session/retrieve/liveness.check.response');
const ResourceContainer = require('../../../../src/idv_service/session/retrieve/resource.container');
const IdDocumentComparisonCheckResponse = require('../../../../src/idv_service/session/retrieve/id.document.comparison.check.response');
const ThirdPartyIdentityCheckResponse = require('../../../../src/idv_service/session/retrieve/third.party.identity.check.response');
const WatchlistScreeningCheckResponse = require('../../../../src/idv_service/session/retrieve/watchlist.screening.check.response');
const WatchlistAdvancedCaCheckResponse = require('../../../../src/idv_service/session/retrieve/watchlist.advanced.ca.check.response');
const ThirdPartyIdentityFraud1CheckResponse = require('../../../../src/idv_service/session/retrieve/third.party.identity.fraud.1.check.response');
const FaceComparisonCheckResponse = require('../../../../src/idv_service/session/retrieve/face.comparison.check.response');
const IdentityProfileResponse = require('../../../../src/idv_service/session/retrieve/identity_profile/identity.profile.response');
const AdvancedIdentityProfileResponse = require('../../../../src/idv_service/session/retrieve/identity_profile/advanced/advanced.identity.profile.response');
const { YotiDate } = require('../../../..');

const ID_DOCUMENT_AUTHENTICITY = 'ID_DOCUMENT_AUTHENTICITY';
const ID_DOCUMENT_FACE_MATCH = 'ID_DOCUMENT_FACE_MATCH';
const ID_DOCUMENT_TEXT_DATA_CHECK = 'ID_DOCUMENT_TEXT_DATA_CHECK';
const SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK = 'SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK';
const LIVENESS = 'LIVENESS';
const ID_DOCUMENT_COMPARISON = 'ID_DOCUMENT_COMPARISON';
const THIRD_PARTY_IDENTITY = 'THIRD_PARTY_IDENTITY';
const WATCHLIST_SCREENING = 'WATCHLIST_SCREENING';
const WATCHLIST_ADVANCED_CA = 'WATCHLIST_ADVANCED_CA';
const SOME_UNKNOWN_CHECK = 'SOME_UNKNOWN_CHECK';
const THIRD_PARTY_IDENTITY_FRAUD_1 = 'THIRD_PARTY_IDENTITY_FRAUD_1';
const FACE_COMPARISON = 'FACE_COMPARISON';
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
        {
          type: WATCHLIST_SCREENING,
        },
        {
          type: WATCHLIST_ADVANCED_CA,
        },
        {
          type: THIRD_PARTY_IDENTITY_FRAUD_1,
        },
        {
          type: FACE_COMPARISON,
        },
      ],
      biometric_consent: SOME_DATE_STRING,
      identity_profile: {
        subject_id: 'someStringHere',
        result: 'DONE',
        failure_reason: {
          reason_code: 'MANDATORY_DOCUMENT_COULD_NOT_BE_PROVIDED',
        },
        identity_profile_report: {
          trust_framework: 'UK_TFIDA',
          schemes_compliance: [
            {
              scheme: {
                type: 'DBS',
                objective: 'STANDARD',
              },
              requirements_met: true,
              requirements_not_met_info: 'some string here',
            },
          ],
          media: {
            id: 'c69ff2db-6caf-4e74-8386-037711bbc8d7',
            type: 'IMAGE',
            created: '2022-03-29T11:39:24Z',
            last_updated: '2022-03-29T11:39:24Z',
          },
        },
      },
      advanced_identity_profile: {
        subject_id: 'some-subject',
        result: 'DONE',
        failure_reason: {
          reason_code: 'MANDATORY_DOCUMENT_NOT_PROVIDED',
          requirements_not_met_details: [
            {
              failure_type: 'ID_DOCUMENT_EXTRACTION',
              document_type: 'PASSPORT',
              document_country_iso_code: 'GBR',
              audit_id: 'audit-123',
              details: 'something not right',
            },
            {
              failure_type: 'ID_DOCUMENT_AUTHENTICITY',
              document_type: 'PASSPORT',
              document_country_iso_code: 'GBR',
              audit_id: 'audit-456',
              details: 'something still not right',
            },
          ],
        },
        identity_profile_report: {
          compliance: [
            {
              trust_framework: 'UK_TFIDA',
              schemes_compliance: [
                {
                  requirements_met: true,
                  scheme: {
                    type: 'DBS',
                    objective: 'STANDARD',
                    label: 'dbs-standard',
                  },
                },
                {
                  requirements_met: false,
                  requirements_not_met_info: 'HORRIBLE_FAILURE',
                  scheme: {
                    type: 'RTW',
                    label: 'some-RTW',
                  },
                },
              ],
            },
            {
              trust_framework: 'YOTI_GLOBAL',
              schemes_compliance: [
                {
                  requirements_met: true,
                  scheme: {
                    type: 'IDENTITY',
                    objective: 'AL_M1',
                    label: 'identity-AL-M1',
                  },
                },
                {
                  requirements_met: false,
                  requirements_not_met_info: 'HORRIBLE_FAILURE',
                  scheme: {
                    type: 'IDENTITY',
                    objective: 'AL_L1',
                    label: 'identity-AL-L1',
                  },
                },
              ],
            },
          ],
          media: {},
        },
      },
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
        expect(checks.length).toBe(11);
        expect(checks[0]).toBeInstanceOf(AuthenticityCheckResponse);
        expect(checks[1]).toBeInstanceOf(LivenessCheckResponse);
        expect(checks[2]).toBeInstanceOf(FaceMatchCheckResponse);
        expect(checks[3]).toBeInstanceOf(TextDataCheckResponse);
        expect(checks[4]).toBeInstanceOf(IdDocumentComparisonCheckResponse);
        expect(checks[5]).toBeInstanceOf(SupplementaryDocumentTextDataCheckResponse);
        expect(checks[6]).toBeInstanceOf(ThirdPartyIdentityCheckResponse);
        expect(checks[7]).toBeInstanceOf(WatchlistScreeningCheckResponse);
        expect(checks[8]).toBeInstanceOf(WatchlistAdvancedCaCheckResponse);
        expect(checks[9]).toBeInstanceOf(ThirdPartyIdentityFraud1CheckResponse);
        expect(checks[10]).toBeInstanceOf(FaceComparisonCheckResponse);
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

  describe('#getWatchlistScreeningChecks', () => {
    it('should return array of WatchlistScreeningCheckResponse', () => {
      const checks = session.getWatchlistScreeningChecks();
      expect(checks.length).toBe(1);
      expect(checks[0]).toBeInstanceOf(WatchlistScreeningCheckResponse);
      expect(checks[0].getType()).toBe(WATCHLIST_SCREENING);
    });
  });

  describe('#getWatchlistAdvancedCaChecks', () => {
    it('should return array of WatchlistAdvancedCaCheckResponse', () => {
      const checks = session.getWatchlistAdvancedCaChecks();
      expect(checks.length).toBe(1);
      expect(checks[0]).toBeInstanceOf(WatchlistAdvancedCaCheckResponse);
      expect(checks[0].getType()).toBe(WATCHLIST_ADVANCED_CA);
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

  describe('#getThirdPartyIdentityFraud1Checks', () => {
    it('should return array of ThirdPartyIdentityFraud1Checks', () => {
      const checks = session.getThirdPartyIdentityFraud1Checks();
      expect(checks.length).toBe(1);
      expect(checks[0]).toBeInstanceOf(ThirdPartyIdentityFraud1CheckResponse);
      expect(checks[0].getType()).toBe(THIRD_PARTY_IDENTITY_FRAUD_1);
    });
  });

  describe('#getFaceComparisonChecks', () => {
    it('should return array of FaceComparisonCheckResponse', () => {
      const checks = session.getFaceComparisonChecks();
      expect(checks.length).toBe(1);
      expect(checks[0]).toBeInstanceOf(FaceComparisonCheckResponse);
      expect(checks[0].getType()).toBe(FACE_COMPARISON);
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

  describe('#getIdentityProfile', () => {
    it('should return instance of IdentityProfileResponse', () => {
      const identityProfile = session.getIdentityProfile();

      expect(identityProfile).toBeInstanceOf(IdentityProfileResponse);
    });
  });

  describe('#getAdvancedIdentityProfile', () => {
    it('should return instance of AdvancedIdentityProfileResponse', () => {
      const advancedIdentityProfile = session.getAdvancedIdentityProfile();

      expect(advancedIdentityProfile).toBeInstanceOf(AdvancedIdentityProfileResponse);
    });
  });
});
