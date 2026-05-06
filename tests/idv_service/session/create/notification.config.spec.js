const IDVConstants = require('../../../../src/idv_service/idv.constants');
const NotificationConfig = require('../../../../src/idv_service/session/create/notification.config');

const SOME_AUTH_TOKEN = 'some-auth-token';
const SOME_ENDPOINT = 'some-endpoint';

describe('NotificationConfig', () => {
  it('should serialize without topics and no auth_type', () => {
    const notificationConfig = new NotificationConfig(
      SOME_AUTH_TOKEN,
      SOME_ENDPOINT
    );

    const expectedJson = JSON.stringify({
      auth_token: SOME_AUTH_TOKEN,
      endpoint: SOME_ENDPOINT,
    });

    expect(JSON.stringify(notificationConfig)).toBe(expectedJson);
  });

  it('should serialize with auth_type when provided', () => {
    const notificationConfig = new NotificationConfig(
      SOME_AUTH_TOKEN,
      SOME_ENDPOINT,
      undefined,
      IDVConstants.BEARER
    );

    const expectedJson = JSON.stringify({
      auth_token: SOME_AUTH_TOKEN,
      auth_type: IDVConstants.BEARER,
      endpoint: SOME_ENDPOINT,
    });

    expect(JSON.stringify(notificationConfig)).toBe(expectedJson);
  });
});
