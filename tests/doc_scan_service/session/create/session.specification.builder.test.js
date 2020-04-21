const {
  SessionSpecificationBuilder,
  RequestedTextExtractionTaskBuilder,
  RequestedLivenessCheckBuilder,
  RequestedFaceMatchCheckBuilder,
  RequestedDocumentAuthenticityCheckBuilder,
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

    const docAuthenticityCheck = new RequestedDocumentAuthenticityCheckBuilder()
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
        {
          type: 'ID_DOCUMENT_FACE_MATCH',
          config: {
            manual_check: 'NEVER',
          },
        },
        {
          type: 'LIVENESS',
          config: {
            max_retries: 1,
            liveness_type: 'ZOOM',
          },
        },
        {
          type: 'ID_DOCUMENT_AUTHENTICITY',
          config: {},
        },
      ],
      requested_tasks: [
        {
          type: 'ID_DOCUMENT_TEXT_DATA_EXTRACTION',
          config: {
            manual_check: 'FALLBACK',
          },
        },
      ],
      sdk_config: {
        allowed_capture_methods: 'CAMERA',
      },
      required_documents: [
        {
          type: 'ID_DOCUMENT',
          filter: {
            type: 'DOCUMENT_RESTRICTIONS',
            inclusion: 'WHITELIST',
            documents: [],
          },
        },
      ],
    });

    expect(JSON.stringify(sessionSpec)).toBe(expectedJson);
  });
});
