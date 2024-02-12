const {
  DigitalIdentityBuilders: {
    PolicyBuilder,
    WantedAttributeBuilder,
    SourceConstraintBuilder,
    ConstraintsBuilder,
  },
} = require('../../..');

const Policy = require('../../../src/digital_identity_service/policy/policy');
const WantedAttribute = require('../../../src/digital_identity_service/policy/wanted.attribute');

const CONSTRAINT_TYPE_SOURCE = 'SOURCE';

/**
 * Compares serialized  policy with expected JSON data.
 *
 * @param {Policy} policy the  policy to serialize.
 * @param {object} expectedJsonData expected JSON data to serialize.
 */
const expectPolicyJson = (policy, expectedJsonData) => {
  expect(policy).toBeInstanceOf(Policy);
  expect(JSON.stringify(policy)).toBe(JSON.stringify(expectedJsonData));
};

/**
 * Checks that expected attributes have been added to policy.
 *
 * @param {Policy} policy  policy to check.
 * @param {object} expectedWantedAttributeData expected wanted attribute data.
 */
const expectPolicyAttributes = (policy, expectedWantedAttributeData) => {
  // Assert that all items are instance of WantedAttribute.
  policy.getWantedAttributes().forEach((wantedAttribute) => {
    expect(wantedAttribute).toBeInstanceOf(WantedAttribute);
  });

  // Build an array of WantedAttribute to check.
  const expectedWantedAttributes = [];
  expectedWantedAttributeData.forEach((args) => {
    expectedWantedAttributes.push(new WantedAttribute(
      args.name,
      args.derivation
    ));
  });

  // Assert that expected wanted attributes match  policy wanted attributes.
  expect(policy.getWantedAttributes()).toEqual(expectedWantedAttributes);
};

describe('PolicyBuilder', () => {
  const EXPECTED_SELFIE_AUTH_TYPE = 1;
  const EXPECTED_PIN_AUTH_TYPE = 2;

  it('should build with attributes', () => {
    const policy = new PolicyBuilder()
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
      .withDocumentDetails()
      .withDocumentImages()
      .build();

    const expectedWantedAttributeData = [
      { name: 'family_name', optional: false },
      { name: 'given_names', optional: false },
      { name: 'full_name', optional: false },
      { name: 'date_of_birth', optional: false },
      { name: 'gender', optional: false },
      { name: 'postal_address', optional: false },
      { name: 'structured_postal_address', optional: false },
      { name: 'nationality', optional: false },
      { name: 'phone_number', optional: false },
      { name: 'selfie', optional: false },
      { name: 'email_address', optional: false },
      { name: 'document_details', optional: false },
      { name: 'document_images', optional: false },
    ];

    expectPolicyAttributes(policy, expectedWantedAttributeData);

    expectPolicyJson(policy, {
      wanted: expectedWantedAttributeData,
      wanted_auth_types: [],
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with attributes by name', () => {
    const policy = new PolicyBuilder()
      .withWantedAttributeByName('family_name')
      .withWantedAttributeByName('given_names')
      .build();

    const expectedWantedAttributeData = [
      { name: 'family_name', optional: false },
      { name: 'given_names', optional: false },
    ];

    expectPolicyAttributes(policy, expectedWantedAttributeData);

    expectPolicyJson(policy, {
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

    const policy = new PolicyBuilder()
      .withWantedAttribute(wantedFamilyName)
      .withWantedAttribute(wantedGivenNames)
      .build();

    const expectedWantedAttributeData = [
      { name: 'family_name', optional: false },
      { name: 'given_names', optional: false },
    ];

    expectPolicyAttributes(policy, expectedWantedAttributeData);

    expectPolicyJson(policy, {
      wanted: expectedWantedAttributeData,
      wanted_auth_types: [],
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should fail when invalid attribute objects are used', () => {
    const builder = new PolicyBuilder();
    expect(() => builder.withWantedAttribute('invalid attribute'))
      .toThrow(new TypeError('wantedAttribute must be instance of WantedAttribute'));
  });

  it('should build with age derived attributes', () => {
    const policy = new PolicyBuilder()
      .withDateOfBirth()
      .withAgeOver(18)
      .withAgeUnder(30)
      .withAgeUnder(40)
      .build();

    const expectedWantedAttributeData = [
      { name: 'date_of_birth', optional: false },
      { name: 'date_of_birth', optional: false, derivation: 'age_over:18' },
      { name: 'date_of_birth', optional: false, derivation: 'age_under:30' },
      { name: 'date_of_birth', optional: false, derivation: 'age_under:40' },
    ];

    expectPolicyAttributes(policy, expectedWantedAttributeData);

    expectPolicyJson(policy, {
      wanted: expectedWantedAttributeData,
      wanted_auth_types: [],
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should only allow integers for age over', () => {
    expect(() => {
      new PolicyBuilder()
        .withDateOfBirth()
        .withAgeOver('18');
    }).toThrow(new TypeError('age must be an integer'));
  });

  it('should only allow integers for age under', () => {
    expect(() => {
      new PolicyBuilder()
        .withDateOfBirth()
        .withAgeOver('30');
    }).toThrow(new TypeError('age must be an integer'));
  });

  it('should overwrite identical age verification to ensure it only exists once', () => {
    const policy = new PolicyBuilder()
      .withAgeUnder(30)
      .withAgeUnder(30)
      .build();

    const expectedWantedAttributeData = [
      { name: 'date_of_birth', optional: false, derivation: 'age_under:30' },
    ];

    expectPolicyAttributes(policy, expectedWantedAttributeData);

    expectPolicyJson(policy, {
      wanted: expectedWantedAttributeData,
      wanted_auth_types: [],
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with auth types', () => {
    const policy = new PolicyBuilder()
      .withSelfieAuthentication()
      .withPinAuthentication()
      .withWantedAuthType(99)
      .build();

    const expectedAuthTypes = [EXPECTED_SELFIE_AUTH_TYPE, EXPECTED_PIN_AUTH_TYPE, 99];

    expect(policy.getWantedAuthTypes()).toEqual(expectedAuthTypes);

    expectPolicyJson(policy, {
      wanted: [],
      wanted_auth_types: expectedAuthTypes,
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with auth types true', () => {
    const policy = new PolicyBuilder()
      .withSelfieAuthentication(true)
      .withPinAuthentication(true)
      .withWantedAuthType(99)
      .build();

    const expectedAuthTypes = [EXPECTED_SELFIE_AUTH_TYPE, EXPECTED_PIN_AUTH_TYPE, 99];

    expect(policy.getWantedAuthTypes()).toEqual(expectedAuthTypes);

    expectPolicyJson(policy, {
      wanted: [],
      wanted_auth_types: expectedAuthTypes,
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with auth types false', () => {
    const policy = new PolicyBuilder()
      .withSelfieAuthentication(false)
      .withPinAuthentication(false)
      .build();

    const expectedAuthTypes = [];

    expect(policy.getWantedAuthTypes()).toEqual(expectedAuthTypes);

    expectPolicyJson(policy, {
      wanted: [],
      wanted_auth_types: expectedAuthTypes,
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with remember me flags', () => {
    const policy = new PolicyBuilder()
      .withWantedRememberMe(true)
      .build();

    expect(policy.getWantedRememberMe()).toBe(true);

    expectPolicyJson(policy, {
      wanted: [],
      wanted_auth_types: [],
      wanted_remember_me: true,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with no selfie or pin auth', () => {
    const policy = new PolicyBuilder()
      .withSelfieAuthentication(true)
      .withSelfieAuthentication(false)
      .withPinAuthentication(true)
      .withPinAuthentication(false)
      .build();

    const authTypes = policy.getWantedAuthTypes();
    expect(authTypes).not.toContain(EXPECTED_SELFIE_AUTH_TYPE);
    expect(authTypes).not.toContain(EXPECTED_PIN_AUTH_TYPE);
  });

  it('should build with no more than one auth type', () => {
    const policy = new PolicyBuilder()
      .withSelfieAuthentication(true)
      .withSelfieAuthentication()
      .withSelfieAuthentication(true)
      .build();

    const authTypesLength = policy.getWantedAuthTypes().length;
    expect(authTypesLength).toBe(1);
  });

  it('should build with only two auth types', () => {
    const policy = new PolicyBuilder()
      .withSelfieAuthentication(true)
      .withPinAuthentication(true)
      .build();

    const authTypesLength = policy.getWantedAuthTypes().length;
    expect(authTypesLength).toBe(2);
  });

  it('should build with no selfie authentication after having it added then removed', () => {
    const policy = new PolicyBuilder()
      .withSelfieAuthentication(true)
      .withSelfieAuthentication(false)
      .build();

    expect(policy.wantedAuthTypes).not.toContain(EXPECTED_SELFIE_AUTH_TYPE);
  });

  it('should build with no pin authentication after having it added then removed', () => {
    const policy = new PolicyBuilder()
      .withPinAuthentication(true)
      .withPinAuthentication(false)
      .build();

    expect(policy.wantedAuthTypes).not.toContain(EXPECTED_PIN_AUTH_TYPE);
  });

  it('should build with the same attribute with different constraints', () => {
    const passportConstraint = new ConstraintsBuilder()
      .withSourceConstraint(new SourceConstraintBuilder()
        .withPassport()
        .build())
      .build();

    const drivingLicenseConstraint = new ConstraintsBuilder()
      .withSourceConstraint(new SourceConstraintBuilder()
        .withDrivingLicence()
        .build())
      .build();

    const policy = new PolicyBuilder()
      .withFamilyName(passportConstraint)
      .withFamilyName(drivingLicenseConstraint, true)
      .build();

    const expectedWantedAttributeData = {
      wanted: [
        {
          name: 'family_name',
          optional: false,
          constraints: [
            {
              type: CONSTRAINT_TYPE_SOURCE,
              preferred_sources: {
                anchors: [
                  {
                    name: 'PASSPORT',
                    sub_type: '',
                  },
                ],
                soft_preference: false,
              },
            },
          ],
        },
        {
          name: 'family_name',
          optional: false,
          constraints: [
            {
              type: CONSTRAINT_TYPE_SOURCE,
              preferred_sources: {
                anchors: [
                  {
                    name: 'DRIVING_LICENCE',
                    sub_type: '',
                  },
                ],
                soft_preference: false,
              },
            },
          ],
          accept_self_asserted: true,
        },
      ],
      wanted_auth_types: [],
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    };

    expectPolicyJson(policy, expectedWantedAttributeData);
  });

  describe('when using with identity profile requirements', () => {
    const identityProfileRequirementsDescriptor = {
      trust_framework: 'UK_TFIDA',
      scheme: {
        type: 'DBS',
        objective: 'STANDARD',
      },
    };

    it('should build with identity profile requirements only', () => {
      const policy = new PolicyBuilder()
        .withIdentityProfileRequirements(identityProfileRequirementsDescriptor)
        .build();

      expect(policy.getIdentityProfileRequirements())
        .toEqual(identityProfileRequirementsDescriptor);

      expectPolicyJson(policy, {
        wanted: [],
        wanted_auth_types: [],
        wanted_remember_me: false,
        wanted_remember_me_optional: false,
        identity_profile_requirements: identityProfileRequirementsDescriptor,
      });
    });

    it('should build with identity profile requirements alongside other wanted attributes', () => {
      const policy = new PolicyBuilder()
        .withGender()
        .withNationality()
        .withIdentityProfileRequirements(identityProfileRequirementsDescriptor)
        .build();

      const expectedWantedAttributeData = [
        { name: 'gender', optional: false },
        { name: 'nationality', optional: false },
      ];

      expectPolicyAttributes(policy, expectedWantedAttributeData);

      expect(policy.getIdentityProfileRequirements())
        .toEqual(identityProfileRequirementsDescriptor);

      expectPolicyJson(policy, {
        wanted: expectedWantedAttributeData,
        wanted_auth_types: [],
        wanted_remember_me: false,
        wanted_remember_me_optional: false,
        identity_profile_requirements: identityProfileRequirementsDescriptor,
      });
    });
  });

  describe('when using with advanced identity profile requirements', () => {
    const advancedIdentityProfileRequirementsDescriptor = {
      profiles: [
        {
          trust_framework: 'UK_TFIDA',
          schemes: [
            {
              label: 'LB912',
              type: 'RTW',
            },
            {
              label: 'LB777',
              type: 'DBS',
              objective: 'BASIC',
            },
          ],
        },
        {
          trust_framework: 'YOTI_GLOBAL',
          schemes: [
            {
              label: 'LB321',
              type: 'IDENTITY',
              objective: 'AL_L1',
            },
          ],
        },
      ],
    };

    it('should build with identity profile requirements only', () => {
      const policy = new PolicyBuilder()
        .withAdvancedIdentityProfileRequirements(advancedIdentityProfileRequirementsDescriptor)
        .build();

      expect(policy.getAdvancedIdentityProfileRequirements())
        .toEqual(advancedIdentityProfileRequirementsDescriptor);

      expectPolicyJson(policy, {
        wanted: [],
        wanted_auth_types: [],
        wanted_remember_me: false,
        wanted_remember_me_optional: false,
        advanced_identity_profile_requirements: advancedIdentityProfileRequirementsDescriptor,
      });
    });

    it('should build with identity profile requirements alongside other wanted attributes', () => {
      const policy = new PolicyBuilder()
        .withGender()
        .withNationality()
        .withAdvancedIdentityProfileRequirements(advancedIdentityProfileRequirementsDescriptor)
        .build();

      const expectedWantedAttributeData = [
        { name: 'gender', optional: false },
        { name: 'nationality', optional: false },
      ];

      expectPolicyAttributes(policy, expectedWantedAttributeData);

      expect(policy.getAdvancedIdentityProfileRequirements())
        .toEqual(advancedIdentityProfileRequirementsDescriptor);

      expectPolicyJson(policy, {
        wanted: expectedWantedAttributeData,
        wanted_auth_types: [],
        wanted_remember_me: false,
        wanted_remember_me_optional: false,
        advanced_identity_profile_requirements: advancedIdentityProfileRequirementsDescriptor,
      });
    });
  });
});
