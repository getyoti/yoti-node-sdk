const {
  DigitalIdentityBuilders: {
    ExtensionBuilder,
    PolicyBuilder,
    ShareSessionConfigurationBuilder,
    ShareSessionNotificationBuilder,
  },
} = require('../..');

const ShareSessionConfiguration = require('../../src/digital_identity_service/share.session.configuration');

describe('ShareSessionConfigurationBuilder', () => {
  it('should build ShareSessionConfiguration', () => {
    const policy = new PolicyBuilder()
      .withFullName()
      .withGivenNames()
      .withWantedRememberMe()
      .build();

    const extension1 = new ExtensionBuilder()
      .withType('test-extension')
      .withContent({ test: 'content 1' })
      .build();

    const extension2 = new ExtensionBuilder()
      .withType('test-extension')
      .withContent({ test: 'content 2' })
      .build();

    const subject = {
      subject_id: 'some_subject_id_string',
    };

    const notification = new ShareSessionNotificationBuilder().withUrl('/abc').build();

    const shareSessionConfig = new ShareSessionConfigurationBuilder()
      .withRedirectUri('/test-callback')
      .withPolicy(policy)
      .withExtension(extension1)
      .withExtension(extension2)
      .withSubject(subject)
      .withNotification(notification)
      .build();

    expect(shareSessionConfig.getRedirectUri()).toBe('/test-callback');
    expect(shareSessionConfig.getPolicy()).toBe(policy);
    expect(shareSessionConfig.getExtensions()).toEqual([extension1, extension2]);
    expect(shareSessionConfig.getSubject()).toEqual(subject);

    const expectedJsonData = {
      notification: { url: '/abc', headers: {}, verifyTls: true },
      policy: {
        wanted: [
          {
            name: 'full_name',
            optional: false,
          },
          {
            name: 'given_names',
            optional: false,
          },
        ],
        wanted_auth_types: [],
        wanted_remember_me: true,
        wanted_remember_me_optional: false,
      },
      extensions: [
        {
          type: 'test-extension',
          content: {
            test: 'content 1',
          },
        },
        {
          type: 'test-extension',
          content: {
            test: 'content 2',
          },
        },
      ],
      subject: {
        subject_id: 'some_subject_id_string',
      },
      redirectUri: '/test-callback',
    };
    const expectedJson = JSON.stringify(expectedJsonData);

    expect(shareSessionConfig).toBeInstanceOf(ShareSessionConfiguration);
    expect(JSON.stringify(shareSessionConfig)).toBe(expectedJson);
  });
});
