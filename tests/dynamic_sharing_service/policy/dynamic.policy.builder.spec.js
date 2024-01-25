const {
  DynamicPolicyBuilder,
  WantedAttributeBuilder,
  SourceConstraintBuilder,
  ConstraintsBuilder,
} = require('../../..');

const DynamicPolicy = require('../../../src/dynamic_sharing_service/policy/dynamic.policy');
const WantedAttribute = require('../../../src/dynamic_sharing_service/policy/wanted.attribute');

const CONSTRAINT_TYPE_SOURCE = 'SOURCE';

/**
 * Compares serialized dynamic policy with expected JSON data.
 *
 * @param {DynamicPolicy} dynamicPolicy the dynamic policy to serialize.
 * @param {object} expectedJsonData expected JSON data to serialize.
 */
const expectDynamicPolicyJson = (dynamicPolicy, expectedJsonData) => {
  expect(dynamicPolicy).toBeInstanceOf(DynamicPolicy);
  expect(JSON.stringify(dynamicPolicy)).toBe(JSON.stringify(expectedJsonData));
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

  // Assert that expected wanted attributes match dynamic policy wanted attributes.
  expect(dynamicPolicy.getWantedAttributes()).toEqual(expectedWantedAttributes);
};

describe('DynamicPolicyBuilder', () => {
  const EXPECTED_SELFIE_AUTH_TYPE = 1;
  const EXPECTED_PIN_AUTH_TYPE = 2;

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
      { name: 'family_name', optional: false },
      { name: 'given_names', optional: false },
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
      { name: 'family_name', optional: false },
      { name: 'given_names', optional: false },
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
    expect(() => builder.withWantedAttribute('invalid attribute'))
      .toThrow(new TypeError('wantedAttribute must be instance of WantedAttribute'));
  });

  it('should build with age derived attributes', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
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

    expectDynamicPolicyAttributes(dynamicPolicy, expectedWantedAttributeData);

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: expectedWantedAttributeData,
      wanted_auth_types: [],
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should only allow integers for age over', () => {
    expect(() => {
      new DynamicPolicyBuilder()
        .withDateOfBirth()
        .withAgeOver('18');
    }).toThrow(new TypeError('age must be an integer'));
  });

  it('should only allow integers for age under', () => {
    expect(() => {
      new DynamicPolicyBuilder()
        .withDateOfBirth()
        .withAgeOver('30');
    }).toThrow(new TypeError('age must be an integer'));
  });

  it('should overwrite identical age verification to ensure it only exists once', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withAgeUnder(30)
      .withAgeUnder(30)
      .build();

    const expectedWantedAttributeData = [
      { name: 'date_of_birth', optional: false, derivation: 'age_under:30' },
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

    const expectedAuthTypes = [EXPECTED_SELFIE_AUTH_TYPE, EXPECTED_PIN_AUTH_TYPE, 99];

    expect(dynamicPolicy.getWantedAuthTypes()).toEqual(expectedAuthTypes);

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: [],
      wanted_auth_types: expectedAuthTypes,
      wanted_remember_me: false,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with auth types true', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withSelfieAuthentication(true)
      .withPinAuthentication(true)
      .withWantedAuthType(99)
      .build();

    const expectedAuthTypes = [EXPECTED_SELFIE_AUTH_TYPE, EXPECTED_PIN_AUTH_TYPE, 99];

    expect(dynamicPolicy.getWantedAuthTypes()).toEqual(expectedAuthTypes);

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

    expect(dynamicPolicy.getWantedAuthTypes()).toEqual(expectedAuthTypes);

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

    expect(dynamicPolicy.getWantedRememberMe()).toBe(true);

    expectDynamicPolicyJson(dynamicPolicy, {
      wanted: [],
      wanted_auth_types: [],
      wanted_remember_me: true,
      wanted_remember_me_optional: false,
    });
  });

  it('should build with no selfie or pin auth', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withSelfieAuthentication(true)
      .withSelfieAuthentication(false)
      .withPinAuthentication(true)
      .withPinAuthentication(false)
      .build();

    const authTypes = dynamicPolicy.getWantedAuthTypes();
    expect(authTypes).not.toContain(EXPECTED_SELFIE_AUTH_TYPE);
    expect(authTypes).not.toContain(EXPECTED_PIN_AUTH_TYPE);
  });

  it('should build with no more than one auth type', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withSelfieAuthentication(true)
      .withSelfieAuthentication()
      .withSelfieAuthentication(true)
      .build();

    const authTypesLength = dynamicPolicy.getWantedAuthTypes().length;
    expect(authTypesLength).toBe(1);
  });

  it('should build with only two auth types', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withSelfieAuthentication(true)
      .withPinAuthentication(true)
      .build();

    const authTypesLength = dynamicPolicy.getWantedAuthTypes().length;
    expect(authTypesLength).toBe(2);
  });

  it('should build with no selfie authentication after having it added then removed', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withSelfieAuthentication(true)
      .withSelfieAuthentication(false)
      .build();

    expect(dynamicPolicy.wantedAuthTypes).not.toContain(EXPECTED_SELFIE_AUTH_TYPE);
  });

  it('should build with no pin authentication after having it added then removed', () => {
    const dynamicPolicy = new DynamicPolicyBuilder()
      .withPinAuthentication(true)
      .withPinAuthentication(false)
      .build();

    expect(dynamicPolicy.wantedAuthTypes).not.toContain(EXPECTED_PIN_AUTH_TYPE);
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

    const dynamicPolicy = new DynamicPolicyBuilder()
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

    expectDynamicPolicyJson(dynamicPolicy, expectedWantedAttributeData);
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
      const dynamicPolicy = new DynamicPolicyBuilder()
        .withIdentityProfileRequirements(identityProfileRequirementsDescriptor)
        .build();

      expect(dynamicPolicy.getIdentityProfileRequirements())
        .toEqual(identityProfileRequirementsDescriptor);

      expectDynamicPolicyJson(dynamicPolicy, {
        wanted: [],
        wanted_auth_types: [],
        wanted_remember_me: false,
        wanted_remember_me_optional: false,
        identity_profile_requirements: identityProfileRequirementsDescriptor,
      });
    });

    it('should build with identity profile requirements alongside other wanted attributes', () => {
      const dynamicPolicy = new DynamicPolicyBuilder()
        .withGender()
        .withNationality()
        .withIdentityProfileRequirements(identityProfileRequirementsDescriptor)
        .build();

      const expectedWantedAttributeData = [
        { name: 'gender', optional: false },
        { name: 'nationality', optional: false },
      ];

      expectDynamicPolicyAttributes(dynamicPolicy, expectedWantedAttributeData);

      expect(dynamicPolicy.getIdentityProfileRequirements())
        .toEqual(identityProfileRequirementsDescriptor);

      expectDynamicPolicyJson(dynamicPolicy, {
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
      const dynamicPolicy = new DynamicPolicyBuilder()
        .withAdvancedIdentityProfileRequirements(advancedIdentityProfileRequirementsDescriptor)
        .build();

      expect(dynamicPolicy.getAdvancedIdentityProfileRequirements())
        .toEqual(advancedIdentityProfileRequirementsDescriptor);

      expectDynamicPolicyJson(dynamicPolicy, {
        wanted: [],
        wanted_auth_types: [],
        wanted_remember_me: false,
        wanted_remember_me_optional: false,
        advanced_identity_profile_requirements: advancedIdentityProfileRequirementsDescriptor,
      });
    });

    it('should build with identity profile requirements alongside other wanted attributes', () => {
      const dynamicPolicy = new DynamicPolicyBuilder()
        .withGender()
        .withNationality()
        .withAdvancedIdentityProfileRequirements(advancedIdentityProfileRequirementsDescriptor)
        .build();

      const expectedWantedAttributeData = [
        { name: 'gender', optional: false },
        { name: 'nationality', optional: false },
      ];

      expectDynamicPolicyAttributes(dynamicPolicy, expectedWantedAttributeData);

      expect(dynamicPolicy.getAdvancedIdentityProfileRequirements())
        .toEqual(advancedIdentityProfileRequirementsDescriptor);

      expectDynamicPolicyJson(dynamicPolicy, {
        wanted: expectedWantedAttributeData,
        wanted_auth_types: [],
        wanted_remember_me: false,
        wanted_remember_me_optional: false,
        advanced_identity_profile_requirements: advancedIdentityProfileRequirementsDescriptor,
      });
    });
  });
});
