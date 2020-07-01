const {
  DynamicScenarioBuilder,
  DynamicPolicyBuilder,
  ExtensionBuilder,
} = require('../..');

const DynamicScenario = require('../../src/dynamic_sharing_service/dynamic.scenario');

describe('DynamicScenarioBuilder', () => {
  it('should build DynamicScenario', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
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

    const dynamicScenario = new DynamicScenarioBuilder()
      .withCallbackEndpoint('/test-callback')
      .withPolicy(dynamicPolicy)
      .withExtension(extension1)
      .withExtension(extension2)
      .build();

    expect(dynamicScenario.getCallbackEndpoint()).toBe('/test-callback');
    expect(dynamicScenario.getDynamicPolicy()).toBe(dynamicPolicy);
    expect(dynamicScenario.getExtensions()).toEqual([extension1, extension2]);

    const expectedJsonData = {
      callback_endpoint: '/test-callback',
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
        wanted_remember_me: false,
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
    };
    const expectedJson = JSON.stringify(expectedJsonData);

    expect(dynamicScenario).toBeInstanceOf(DynamicScenario);
    expect(JSON.stringify(dynamicScenario)).toBe(expectedJson);
  });
});
