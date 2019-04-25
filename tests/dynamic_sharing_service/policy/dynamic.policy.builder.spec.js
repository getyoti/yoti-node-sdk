const {
  expect,
} = require('chai');

const {
  DynamicPolicyBuilder,
  WantedAttributeBuilder,
} = require('../../../');

const DynamicPolicy = require('../../../src/dynamic_sharing_service/policy/dynamic.policy');

const expectDynamicPolicyJson = (dynamicPolicy, expectedJsonData) => {
  expect(dynamicPolicy).to.be.instanceOf(DynamicPolicy);
  expect(JSON.stringify(dynamicPolicy)).to.equal(JSON.stringify(expectedJsonData));
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

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: [
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
      ],
      wanted_auth_types: [],
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with attributes and optional flag', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withFamilyName(true)
      .withGivenNames(true)
      .withFullName(true)
      .withDateOfBirth(true)
      .withGender(true)
      .withPostalAddress(true)
      .withStructuredPostalAddress(true)
      .withNationality(true)
      .withPhoneNumber(true)
      .withSelfie(true)
      .withEmail(true)
      .build(true);

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: [
        { name: 'family_name', derivation: '', optional: true },
        { name: 'given_names', derivation: '', optional: true },
        { name: 'full_name', derivation: '', optional: true },
        { name: 'date_of_birth', derivation: '', optional: true },
        { name: 'gender', derivation: '', optional: true },
        { name: 'postal_address', derivation: '', optional: true },
        { name: 'structured_postal_address', derivation: '', optional: true },
        { name: 'nationality', derivation: '', optional: true },
        { name: 'phone_number', derivation: '', optional: true },
        { name: 'selfie', derivation: '', optional: true },
        { name: 'email_address', derivation: '', optional: true },
      ],
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

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: [
        { name: 'family_name', derivation: '', optional: false },
        { name: 'given_names', derivation: '', optional: false },
      ],
      wanted_auth_types: [],
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with attributes by name and optional flag', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withWantedAttributeByName('family_name', true)
      .withWantedAttributeByName('given_names', true)
      .build();

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: [
        { name: 'family_name', derivation: '', optional: true },
        { name: 'given_names', derivation: '', optional: true },
      ],
      wanted_auth_types: [],
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with attribute objects', () => {
    const wantedFamilyName = new WantedAttributeBuilder()
      .withName('family_name')
      .withOptional(true)
      .build();

    const wantedGivenNames = new WantedAttributeBuilder()
      .withName('given_names')
      .build();

    const dynamicPolicy = new DynamicPolicyBuilder()
      .withWantedAttribute(wantedFamilyName)
      .withWantedAttribute(wantedGivenNames)
      .build();

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: [
        { name: 'family_name', derivation: '', optional: true },
        { name: 'given_names', derivation: '', optional: false },
      ],
      wanted_auth_types: [],
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with age derived attributes', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withDateOfBirth()
      .withAgeOver(18)
      .withAgeUnder(30)
      .withAgeUnder(40)
      .build();

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: [
        { name: 'date_of_birth', derivation: '', optional: false },
        { name: 'date_of_birth', derivation: 'age_over:18', optional: false },
        { name: 'date_of_birth', derivation: 'age_under:30', optional: false },
        { name: 'date_of_birth', derivation: 'age_under:40', optional: false },
      ],
      wanted_auth_types: [],
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with age derived attributes and optional flag', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withDateOfBirth(true)
      .withAgeOver(18, true)
      .withAgeUnder(30, true)
      .withAgeUnder(40, true)
      .build();

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: [
        { name: 'date_of_birth', derivation: '', optional: true },
        { name: 'date_of_birth', derivation: 'age_over:18', optional: true },
        { name: 'date_of_birth', derivation: 'age_under:30', optional: true },
        { name: 'date_of_birth', derivation: 'age_under:40', optional: true },
      ],
      wanted_auth_types: [],
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should overwrite identical age verification to ensure it only exists once', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withAgeUnder(30, true)
      .withAgeUnder(30, false)
      .build();

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: [
        { name: 'date_of_birth', derivation: 'age_under:30', optional: false },
      ],
      wanted_auth_types: [],
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with auth types', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withSelfieAuthorisation()
      .withPinAuthorisation()
      .withWantedAuthType(99)
      .build();

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: [],
      wanted_auth_types: [1, 2, 99],
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with auth types true', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withSelfieAuthorisation(true)
      .withPinAuthorisation(true)
      .withWantedAuthType(99)
      .build();

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: [],
      wanted_auth_types: [1, 2, 99],
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with auth types false', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withSelfieAuthorisation(false)
      .withPinAuthorisation(false)
      .build();

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: [],
      wanted_auth_types: [],
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with remember me flags', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withWantedRememberMe(true)
      .withWantedRememberMeOptional(true)
      .build();

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: [],
      wanted_auth_types: [],
      wanted_remember_me: true,
      wanted_remember_me_optional: true,
    });
  });
});
