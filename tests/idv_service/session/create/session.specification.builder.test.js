const {
  SessionSpecificationBuilder,
  RequestedTextExtractionTaskBuilder,
  RequestedLivenessCheckBuilder,
  RequestedFaceMatchCheckBuilder,
  RequestedDocumentAuthenticityCheckBuilder,
  RequestedIdDocumentComparisonCheckBuilder,
  RequestedThirdPartyIdentityCheckBuilder,
  RequestedWatchlistScreeningCheckBuilder,
  RequestedWatchlistAdvancedCaCheckBuilder,
  NotificationConfigBuilder,
  SdkConfigBuilder,
  RequiredIdDocumentBuilder,
  DocumentRestrictionsFilterBuilder,
  RequestedCustomAccountWatchlistAdvancedCaConfigBuilder,
} = require('../../../..');
const AdvancedIdentityProfile = require('../../../../src/idv_service/session/create/identity_profile/advanced/advanced.identity.profile');
const AdvancedIdentityProfileScheme = require('../../../../src/idv_service/session/create/identity_profile/advanced/advanced.identity.profile.scheme');
const AdvancedIdentityProfileRequirements = require('../../../../src/idv_service/session/create/identity_profile/advanced/advanced.identity.profile.requirements');

describe('SessionSpecificationBuilder', () => {
  it('should build SessionSpecification', () => {
    const sdkConfig = new SdkConfigBuilder()
      .withAllowsCamera()
      .build();

    const notificationConfig = new NotificationConfigBuilder()
      .withEndpoint('some-endpoint')
      .withAuthTypeBearer()
      .build();

    const textExtractionTask = new RequestedTextExtractionTaskBuilder()
      .withManualCheckFallback()
      .build();

    const faceMatchCheck = new RequestedFaceMatchCheckBuilder()
      .withManualCheckNever()
      .build();

    const livenessCheck = new RequestedLivenessCheckBuilder()
      .forZoomLiveness()
      .build();

    const docAuthenticityCheck = new RequestedDocumentAuthenticityCheckBuilder().build();
    const idDocumentComparisonCheck = new RequestedIdDocumentComparisonCheckBuilder().build();
    const thirdPartyIdentityCheck = new RequestedThirdPartyIdentityCheckBuilder().build();
    const watchListScreeningCheck = new RequestedWatchlistScreeningCheckBuilder()
      .withAdverseMediaCategory()
      .withSanctionsCategory()
      .build();

    // eslint-disable-next-line max-len
    const customAccountWatchlistAdvancedCaConfigBuilder = new RequestedCustomAccountWatchlistAdvancedCaConfigBuilder();
    const customAccountWatchlistAdvancedCaConfig = customAccountWatchlistAdvancedCaConfigBuilder
      .withApiKey('api-key')
      .withClientRef('client-ref')
      .build();
    const watchListAdvancedCaCheck = new RequestedWatchlistAdvancedCaCheckBuilder()
      .withConfig(customAccountWatchlistAdvancedCaConfig)
      .build();

    const documentFilter = new DocumentRestrictionsFilterBuilder()
      .forWhitelist()
      .build();

    const requiredDocument = new RequiredIdDocumentBuilder()
      .withFilter(documentFilter)
      .build();

    const subjectDescriptor = {
      subject_id: 'some_subject_id_string',
    };

    const identityProfileRequirementsDescriptor = {
      trust_framework: 'UK_TFIDA',
      scheme: {
        type: 'DBS',
        objective: 'STANDARD',
      },
    };

    const sessionSpec = new SessionSpecificationBuilder()
      .withClientSessionTokenTtl(30)
      .withUserTrackingId('some-tracking-id')
      .withSdkConfig(sdkConfig)
      .withNotifications(notificationConfig)
      .withResourcesTtl(10)
      .withRequestedCheck(faceMatchCheck)
      .withRequestedCheck(livenessCheck)
      .withRequestedCheck(docAuthenticityCheck)
      .withRequestedCheck(idDocumentComparisonCheck)
      .withRequestedCheck(thirdPartyIdentityCheck)
      .withRequestedCheck(watchListScreeningCheck)
      .withRequestedCheck(watchListAdvancedCaCheck)
      .withRequestedTask(textExtractionTask)
      .withRequiredDocument(requiredDocument)
      .withIdentityProfileRequirements(identityProfileRequirementsDescriptor)
      .withSubject(subjectDescriptor)
      .build();

    const expectedJson = JSON.stringify({
      client_session_token_ttl: 30,
      resources_ttl: 10,
      user_tracking_id: 'some-tracking-id',
      notifications: {
        auth_type: 'BEARER',
        endpoint: 'some-endpoint',
        topics: [],
      },
      requested_checks: [
        faceMatchCheck,
        livenessCheck,
        docAuthenticityCheck,
        idDocumentComparisonCheck,
        thirdPartyIdentityCheck,
        watchListScreeningCheck,
        watchListAdvancedCaCheck,
      ],
      requested_tasks: [
        textExtractionTask,
      ],
      sdk_config: {
        allowed_capture_methods: 'CAMERA',
      },
      required_documents: [
        requiredDocument,
      ],
      identity_profile_requirements: {
        trust_framework: 'UK_TFIDA',
        scheme: {
          type: 'DBS',
          objective: 'STANDARD',
        },
      },
      subject: {
        subject_id: 'some_subject_id_string',
      },
    });

    expect(JSON.stringify(sessionSpec)).toBe(expectedJson);
  });

  it('should build SessionSpecification with sessionDeadline specified', () => {
    const sessionDeadline = '2021-12-15T16:46:43.739Z';

    const sessionSpec = new SessionSpecificationBuilder()
      .withSessionDeadline(new Date(sessionDeadline))
      .build();

    const expectedJson = JSON.stringify({
      session_deadline: sessionDeadline,
      requested_checks: [],
      requested_tasks: [],
      required_documents: [],
    });

    expect(JSON.stringify(sessionSpec)).toBe(expectedJson);
  });

  it('should build SessionSpecification with block biometric consent true', () => {
    const sessionSpec = new SessionSpecificationBuilder()
      .withBlockBiometricConsent(true)
      .build();

    const expectedJson = JSON.stringify({
      requested_checks: [],
      requested_tasks: [],
      required_documents: [],
      block_biometric_consent: true,
    });

    expect(JSON.stringify(sessionSpec)).toBe(expectedJson);
  });

  it('should build SessionSpecification with block biometric consent false', () => {
    const sessionSpec = new SessionSpecificationBuilder()
      .withBlockBiometricConsent(false)
      .build();

    const expectedJson = JSON.stringify({
      requested_checks: [],
      requested_tasks: [],
      required_documents: [],
      block_biometric_consent: false,
    });

    expect(JSON.stringify(sessionSpec)).toBe(expectedJson);
  });

  it('should build SessionSpecification with identityProfileRequirements', () => {
    const identityProfileRequirementsDescriptor = {
      trust_framework: 'UK_TFIDA',
      scheme: {
        type: 'DBS',
        objective: 'STANDARD',
      },
    };

    const sessionSpec = new SessionSpecificationBuilder()
      .withIdentityProfileRequirements(identityProfileRequirementsDescriptor)
      .build();

    const expectedJson = JSON.stringify({
      requested_checks: [],
      requested_tasks: [],
      required_documents: [],
      identity_profile_requirements: {
        trust_framework: 'UK_TFIDA',
        scheme: {
          type: 'DBS',
          objective: 'STANDARD',
        },
      },
    });

    expect(JSON.stringify(sessionSpec)).toBe(expectedJson);
  });

  it('should build SessionSpecification with withAdvancedIdentityProfileRequirements', () => {
    const advancedIdentityProfileRequirements = new AdvancedIdentityProfileRequirements([
      new AdvancedIdentityProfile('UK_TFIDA', [
        new AdvancedIdentityProfileScheme('DBS', 'STANDARD', 'dbs-standard'),
        new AdvancedIdentityProfileScheme('RTW', undefined, 'some-rtw'),
      ]),
      new AdvancedIdentityProfile('YOTI_GLOBAL', [
        new AdvancedIdentityProfileScheme('IDENTITY', 'AL_L1', 'identity-AL-L1'),
        new AdvancedIdentityProfileScheme('IDENTITY', 'AL_M1', 'identity-AL-M1'),
      ]),
    ]);

    const sessionSpec = new SessionSpecificationBuilder()
      .withAdvancedIdentityProfileRequirements(advancedIdentityProfileRequirements)
      .build();

    const expectedJson = JSON.stringify({
      requested_checks: [],
      requested_tasks: [],
      required_documents: [],
      advanced_identity_profile_requirements: {
        profiles: [
          {
            trust_framework: 'UK_TFIDA',
            schemes: [
              {
                type: 'DBS',
                objective: 'STANDARD',
                label: 'dbs-standard',
              },
              {
                type: 'RTW',
                label: 'some-rtw',
              },
            ],
          },
          {
            trust_framework: 'YOTI_GLOBAL',
            schemes: [
              {
                type: 'IDENTITY',
                objective: 'AL_L1',
                label: 'identity-AL-L1',
              },
              {
                type: 'IDENTITY',
                objective: 'AL_M1',
                label: 'identity-AL-M1',
              },
            ],
          },
        ],
      },
    });

    expect(JSON.stringify(sessionSpec)).toBe(expectedJson);
  });

  it('should build SessionSpecification with subject', () => {
    const subjectDescriptor = {
      subject_id: 'some_subject_id_string',
    };

    const sessionSpec = new SessionSpecificationBuilder()
      .withSubject(subjectDescriptor)
      .build();

    const expectedJson = JSON.stringify({
      requested_checks: [],
      requested_tasks: [],
      required_documents: [],
      subject: {
        subject_id: 'some_subject_id_string',
      },
    });

    expect(JSON.stringify(sessionSpec)).toBe(expectedJson);
  });
});
