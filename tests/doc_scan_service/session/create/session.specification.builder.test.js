const {
  SessionSpecificationBuilder,
  RequestedTextExtractionTaskBuilder,
  RequestedLivenessCheckBuilder,
  RequestedFaceMatchCheckBuilder,
  RequestedDocumentAuthenticityCheckBuilder,
  RequestedIdDocumentComparisonCheckBuilder,
  RequestedThirdPartyIdentityCheckBuilder,
  NotificationConfigBuilder,
  SdkConfigBuilder,
  RequiredIdDocumentBuilder,
  DocumentRestrictionsFilterBuilder,
} = require('../../../../');

describe('SessionSpecificationBuilder', () => {
  it('should build SessionSpecification', () => {
    const sdkConfig = new SdkConfigBuilder()
      .withAllowsCamera()
      .build();

    const notificationConfig = new NotificationConfigBuilder()
      .withEndpoint('some-endpoint')
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
      .withRequestedTask(textExtractionTask)
      .withRequiredDocument(requiredDocument)
      .build();

    const expectedJson = JSON.stringify({
      client_session_token_ttl: 30,
      resources_ttl: 10,
      user_tracking_id: 'some-tracking-id',
      notifications: {
        endpoint: 'some-endpoint',
        topics: [],
      },
      requested_checks: [
        faceMatchCheck,
        livenessCheck,
        docAuthenticityCheck,
        idDocumentComparisonCheck,
        thirdPartyIdentityCheck,
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
