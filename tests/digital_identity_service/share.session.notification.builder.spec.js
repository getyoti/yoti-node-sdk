const {
  DigitalIdentityBuilders: {
    ShareSessionNotificationBuilder,
  },
} = require('../..');

const ShareSessionNotification = require('../../src/digital_identity_service/share.session.notification');

describe('ShareSessionNotificationBuilder', () => {
  it('should build ShareSessionNotification', () => {
    const notification = new ShareSessionNotificationBuilder()
      .withUrl('/abc')
      .withMethod('some-method')
      .withHeader('a', 'b')
      .withVerifiedTls(true)
      .build();

    expect(notification.getUrl()).toBe('/abc');
    expect(notification.getMethod()).toBe('some-method');
    expect(notification.getHeaders()).toEqual({ a: 'b' });
    expect(notification.getVerifyTls()).toEqual(true);

    const expectedJsonData = {
      url: '/abc', method: 'some-method', headers: { a: 'b' }, verifyTls: true,
    };
    const expectedJson = JSON.stringify(expectedJsonData);

    expect(notification).toBeInstanceOf(ShareSessionNotification);
    expect(JSON.stringify(notification)).toBe(expectedJson);
  });
});
