const SessionSpecification = require('../../../../src/doc_scan_service/session/create/session.specification');

const {
  NotificationConfigBuilder,
  SdkConfigBuilder,
} = require('../../../../');

const SOME_TRACKING_ID = 'some-tracking-id';

describe('SessionSpecification', () => {
  it('should serialize to JSON without optional parameters', () => {
    const sessionSpec = new SessionSpecification(
      30,
      10,
      SOME_TRACKING_ID,
      new NotificationConfigBuilder().build(),
      [],
      [],
      new SdkConfigBuilder().build()
    );

    const expectedJson = JSON.stringify({
      client_session_token_ttl: 30,
      resources_ttl: 10,
      user_tracking_id: SOME_TRACKING_ID,
      notifications: {
        topics: [],
      },
      requested_checks: [],
      requested_tasks: [],
      sdk_config: {},
    });

    expect(JSON.stringify(sessionSpec)).toBe(expectedJson);
  });
});
