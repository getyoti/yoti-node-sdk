const { expect } = require('chai');

const { DynamicScenarioBuilder, DynamicPolicyBuilder, ExtensionBuilder } = require('../../');

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

    expect(dynamicScenario.getCallbackEndpoint()).to.equal('/test-callback');
    expect(dynamicScenario.getDynamicPolicy()).to.equal(dynamicPolicy);
    expect(dynamicScenario.getExtensions()).to.deep.equal([extension1, extension2]);

    const expectedJsonData = {
      callback_endpoint: '/test-callback',
      policy: {
        wanted: [
          {
            name: 'full_name',
            derivation: '',
            optional: false,
          },
          {
            name: 'given_names',
            derivation: '',
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

    expect(dynamicScenario).to.be.instanceOf(DynamicScenario);
    expect(JSON.stringify(dynamicScenario)).to.equal(expectedJson);
  });

  it('should not have selfie or pin auth', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withSelfieAuthentication(true)
      .withSelfieAuthentication(false)
      .withPinAuthentication(true)
      .withPinAuthentication(false)
      .build();

    const authTypes = dynamicPolicy.getWantedAuthTypes();
    expect(authTypes).to.not.contain(1);
    expect(authTypes).to.not.contain(2);
  });

  it('should not have more than one auth type', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withSelfieAuthentication(true)
      .withSelfieAuthentication()
      .withSelfieAuthentication(true)
      .build();

    const authTypesLength = dynamicPolicy.getWantedAuthTypes().length;
    expect(authTypesLength).to.equal(1);
  });

  it('should only have two auth types', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withSelfieAuthentication(true)
      .withPinAuthentication(true)
      .build();

    const authTypesLength = dynamicPolicy.getWantedAuthTypes().length;
    expect(authTypesLength).to.equal(2);
  });

  it('should not have selfie authentication after having it added then removed', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withSelfieAuthentication(true)
      .withSelfieAuthentication(false)
      .build();

    expect(dynamicPolicy.wantedAuthTypes).to.not.contain(1);
  });

  it('should not have pin authentication after having it added then removed', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withPinAuthentication(true)
      .withPinAuthentication(false)
      .build();

    expect(dynamicPolicy.wantedAuthTypes).to.not.contain(1);
  });
});
