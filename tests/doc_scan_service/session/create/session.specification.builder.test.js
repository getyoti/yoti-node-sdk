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
});
