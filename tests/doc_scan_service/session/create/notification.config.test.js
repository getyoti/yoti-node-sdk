const NotificationConfig = require('../../../../src/doc_scan_service/session/create/notification.config');

const SOME_AUTH_TOKEN = 'some-auth-token';
const SOME_ENDPOINT = 'some-endpoint';

describe('NotificationConfig', () => {
  it('should serialize without topics', () => {
    const notificationConfig = new NotificationConfig(SOME_AUTH_TOKEN, SOME_ENDPOINT);

    const expectedJson = JSON.stringify({
      auth_token: SOME_AUTH_TOKEN,
      endpoint: SOME_ENDPOINT,
    });

    expect(JSON.stringify(notificationConfig)).toBe(expectedJson);
  });
});
