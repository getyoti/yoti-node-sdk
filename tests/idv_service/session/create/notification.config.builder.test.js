const {
  NotificationConfigBuilder,
} = require('../../../../src/idv_service');
const IDVConstants = require('../../../../src/idv_service/idv.constants');

describe('NotificationConfigBuilder', () => {
  it('should build NotificationConfig', () => {
    const notificationConfig = new NotificationConfigBuilder()
      .withEndpoint('some-endpoint')
      .withAuthToken('some-auth-token')
      .withAuthTypeBearer()
      .withTopic('some-topic')
      .withTopic('some-other-topic')
      .build();

    const expectedJson = JSON.stringify({
      auth_token: 'some-auth-token',
      auth_type: IDVConstants.BEARER,
      endpoint: 'some-endpoint',
      topics: [
        'some-topic',
        'some-other-topic',
      ],
    });

    expect(JSON.stringify(notificationConfig)).toBe(expectedJson);
  });

  it('should build NotificationConfig for resource update', () => {
    const notificationConfig = new NotificationConfigBuilder()
      .forResourceUpdate()
      .build();

    const expectedJson = JSON.stringify({
      topics: [
        'RESOURCE_UPDATE',
      ],
    });

    expect(JSON.stringify(notificationConfig)).toBe(expectedJson);
  });

  it('should build NotificationConfig for task completion', () => {
    const notificationConfig = new NotificationConfigBuilder()
      .forTaskCompletion()
      .build();

    const expectedJson = JSON.stringify({
      topics: [
        'TASK_COMPLETION',
      ],
    });

    expect(JSON.stringify(notificationConfig)).toBe(expectedJson);
  });

  it('should build NotificationConfig for check completion', () => {
    const notificationConfig = new NotificationConfigBuilder()
      .forCheckCompletion()
      .build();

    const expectedJson = JSON.stringify({
      topics: [
        'CHECK_COMPLETION',
      ],
    });

    expect(JSON.stringify(notificationConfig)).toBe(expectedJson);
  });

  it('should build NotificationConfig for session completion', () => {
    const notificationConfig = new NotificationConfigBuilder()
      .forSessionCompletion()
      .build();

    const expectedJson = JSON.stringify({
      topics: [
        'SESSION_COMPLETION',
      ],
    });

    expect(JSON.stringify(notificationConfig)).toBe(expectedJson);
  });

  it('should build NotificationConfig without duplicate topics', () => {
    const notificationConfig = new NotificationConfigBuilder()
      .withTopic('some-topic')
      .withTopic('some-topic')
      .build();

    const expectedJson = JSON.stringify({
      topics: [
        'some-topic',
      ],
    });

    expect(JSON.stringify(notificationConfig)).toBe(expectedJson);
  });

  it('should build NotificationConfig without topics', () => {
    const notificationConfig = new NotificationConfigBuilder().build();

    const expectedJson = JSON.stringify({
      topics: [],
    });

    expect(JSON.stringify(notificationConfig)).toBe(expectedJson);
  });

  it('should build NotificationConfig with authType BEARER', () => {
    const notificationConfig = new NotificationConfigBuilder()
      .withAuthTypeBearer()
      .build();

    const expectedJson = JSON.stringify({
      auth_type: IDVConstants.BEARER,
      topics: [],
    });

    expect(JSON.stringify(notificationConfig)).toBe(expectedJson);
  });

  it('should build NotificationConfig with authType BASIC', () => {
    const notificationConfig = new NotificationConfigBuilder()
      .withAuthTypeBasic()
      .build();

    const expectedJson = JSON.stringify({
      auth_type: IDVConstants.BASIC,
      topics: [],
    });

    expect(JSON.stringify(notificationConfig)).toBe(expectedJson);
  });
});
