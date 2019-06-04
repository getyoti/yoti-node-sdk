const {
  expect,
} = require('chai');

const {
  DynamicPolicyBuilder,
  WantedAttributeBuilder,
} = require('../../../');

const DynamicPolicy = require('../../../src/dynamic_sharing_service/policy/dynamic.policy');
const WantedAttribute = require('../../../src/dynamic_sharing_service/policy/wanted.attribute');

/**
 * Compares serlialized dynamic policy with expected JSON data.
 *
 * @param {DynamicPolicy} dynamicPolicy the dynamic policy to selialize.
 * @param {object} expectedJsonData expected JSON data to serialize.
 */
const expectDynamicPolicyJson = (dynamicPolicy, expectedJsonData) => {
  expect(dynamicPolicy).to.be.instanceOf(DynamicPolicy);
  expect(JSON.stringify(dynamicPolicy)).to.equal(JSON.stringify(expectedJsonData));
};

/**
 * Checks that expected attributes have been added to dynamic policy.
 *
 * @param {DynamicPolicy} dynamicPolicy dynamic policy to check.
 * @param {object} expectedWantedAttributeData expected wanted attribute data.
 */
const expectDynamicPolicyAttributes = (dynamicPolicy, expectedWantedAttributeData) => {
  // Assert that all items are instance of WantedAttribute.
  dynamicPolicy.getWantedAttributes().forEach((wantedAttribute) => {
    expect(wantedAttribute).to.be.instanceOf(WantedAttribute);
  });

  // Build an array of WantedAttribute to check.
  const expectedWantedAttributes = [];
  expectedWantedAttributeData.forEach((args) => {
    expectedWantedAttributes.push(new WantedAttribute(
      args.name,
      args.derivation
    ));
  });

  // Assert that expected wanted attributes match dynamic policy wanted attributes.
  expect(dynamicPolicy.getWantedAttributes()).to.deep.equal(expectedWantedAttributes);
};

describe('DynamicPolicyBuilder', () => {
  it('should build with attributes', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withFamilyName()
      .withGivenNames()
      .withFullName()
      .withDateOfBirth()
      .withGender()
      .withPostalAddress()
      .withStructuredPostalAddress()
      .withNationality()
      .withPhoneNumber()
      .withSelfie()
      .withEmail()
      .build();

    const expectedWantedAttributeData = [
      { name: 'family_name', derivation: '', optional: false },
      { name: 'given_names', derivation: '', optional: false },
      { name: 'full_name', derivation: '', optional: false },
      { name: 'date_of_birth', derivation: '', optional: false },
      { name: 'gender', derivation: '', optional: false },
      { name: 'postal_address', derivation: '', optional: false },
      { name: 'structured_postal_address', derivation: '', optional: false },
      { name: 'nationality', derivation: '', optional: false },
      { name: 'phone_number', derivation: '', optional: false },
      { name: 'selfie', derivation: '', optional: false },
      { name: 'email_address', derivation: '', optional: false },
    ];

    expectDynamicPolicyAttributes(dynamicPolicy, expectedWantedAttributeData);

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: expectedWantedAttributeData,
      wanted_auth_types: [],
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with attributes by name', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withWantedAttributeByName('family_name')
      .withWantedAttributeByName('given_names')
      .build();

    const expectedWantedAttributeData = [
      { name: 'family_name', derivation: '', optional: false },
      { name: 'given_names', derivation: '', optional: false },
    ];

    expectDynamicPolicyAttributes(dynamicPolicy, expectedWantedAttributeData);

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: expectedWantedAttributeData,
      wanted_auth_types: [],
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with attribute objects', () => {
    const wantedFamilyName = new WantedAttributeBuilder()
      .withName('family_name')
      .build();

    const wantedGivenNames = new WantedAttributeBuilder()
      .withName('given_names')
      .build();

    const dynamicPolicy = new DynamicPolicyBuilder()
      .withWantedAttribute(wantedFamilyName)
      .withWantedAttribute(wantedGivenNames)
      .build();


    const expectedWantedAttributeData = [
      { name: 'family_name', derivation: '', optional: false },
      { name: 'given_names', derivation: '', optional: false },
    ];

    expectDynamicPolicyAttributes(dynamicPolicy, expectedWantedAttributeData);

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: expectedWantedAttributeData,
      wanted_auth_types: [],
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should fail when invalid attribute objects are used', () => {
    const builder = new DynamicPolicyBuilder();
    expect(() => builder.withWantedAttribute('invalid attribute')).to.throw(TypeError, 'wantedAttribute must be instance of WantedAttribute');
  });

  it('should build with age derived attributes', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withDateOfBirth()
      .withAgeOver(18)
      .withAgeUnder(30)
      .withAgeUnder(40)
      .build();

    const expectedWantedAttributeData = [
      { name: 'date_of_birth', derivation: '', optional: false },
      { name: 'date_of_birth', derivation: 'age_over:18', optional: false },
      { name: 'date_of_birth', derivation: 'age_under:30', optional: false },
      { name: 'date_of_birth', derivation: 'age_under:40', optional: false },
    ];

    expectDynamicPolicyAttributes(dynamicPolicy, expectedWantedAttributeData);

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: expectedWantedAttributeData,
      wanted_auth_types: [],
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should overwrite identical age verification to ensure it only exists once', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withAgeUnder(30)
      .withAgeUnder(30)
      .build();

    const expectedWantedAttributeData = [
      { name: 'date_of_birth', derivation: 'age_under:30', optional: false },
    ];

    expectDynamicPolicyAttributes(dynamicPolicy, expectedWantedAttributeData);

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: expectedWantedAttributeData,
      wanted_auth_types: [],
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with auth types', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withSelfieAuthentication()
      .withPinAuthentication()
      .withWantedAuthType(99)
      .build();

    const expectedAuthTypes = [1, 2, 99];

    expect(dynamicPolicy.getWantedAuthTypes()).to.deep.equal(expectedAuthTypes);

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: [],
      wanted_auth_types: expectedAuthTypes,
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with auth types true', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withSelfieAuthentication()
      .withPinAuthentication()
      .withWantedAuthType(99)
      .build();

    const expectedAuthTypes = [1, 2, 99];

    expect(dynamicPolicy.getWantedAuthTypes()).to.deep.equal(expectedAuthTypes);

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: [],
      wanted_auth_types: expectedAuthTypes,
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with auth types false', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withSelfieAuthentication(false)
      .withPinAuthentication(false)
      .build();

    const expectedAuthTypes = [];

    expect(dynamicPolicy.getWantedAuthTypes()).to.deep.equal(expectedAuthTypes);

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: [],
      wanted_auth_types: expectedAuthTypes,
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with remember me flags', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withWantedRememberMe(true)
      .build();

    expect(dynamicPolicy.getWantedRememberMe()).to.equal(true);

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: [],
      wanted_auth_types: [],
      wanted_remember_me: true,
      wanted_remember_me_optional: false,
    });
  });
});
