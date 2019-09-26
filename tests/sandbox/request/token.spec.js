const {
  TokenRequestBuilder,
  SandboxAgeVerificationBuilder,
  SandboxAnchorBuilder,
} = require('../../..');

const SOME_REMEMEBER_ME_ID = 'someRememberMeId';
const SOME_VALUE = 'someStringValue';
const SOME_ANCHOR = new SandboxAnchorBuilder()
  .withType('someAnchorType')
  .build();

describe('TokenRequest', () => {
  it('should build with remember me ID', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withRememberMeId(SOME_REMEMEBER_ME_ID)
      .build();

    const expectedData = {
      remember_me_id: SOME_REMEMEBER_ME_ID,
      profile_attributes: [],
    };

    expect(JSON.stringify(tokenRequest))
      .toBe(JSON.stringify(expectedData));
  });
  it('should build with family name', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withFamilyName(SOME_VALUE)
      .build();

    expect(tokenRequest).toContainAttribute('family_name', SOME_VALUE);
  });
  it('should build with family name with anchors', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withFamilyName(SOME_VALUE, [SOME_ANCHOR])
      .build();

    expect(tokenRequest).toContainAttribute('family_name', SOME_VALUE, [SOME_ANCHOR]);
  });
  it('should build with email address', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withEmailAddress(SOME_VALUE)
      .build();

    expect(tokenRequest).toContainAttribute('email_address', SOME_VALUE);
  });
  it('should build with email address with anchors', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withEmailAddress(SOME_VALUE, [SOME_ANCHOR])
      .build();

    expect(tokenRequest).toContainAttribute('email_address', SOME_VALUE, [SOME_ANCHOR]);
  });
  it('should build with full name', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withFullName(SOME_VALUE)
      .build();

    expect(tokenRequest).toContainAttribute('full_name', SOME_VALUE);
  });
  it('should build with full name with anchors', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withFullName(SOME_VALUE, [SOME_ANCHOR])
      .build();

    expect(tokenRequest).toContainAttribute('full_name', SOME_VALUE, [SOME_ANCHOR]);
  });
  it('should build with date of birth', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withDateOfBirth(SOME_VALUE)
      .build();

    expect(tokenRequest).toContainAttribute('date_of_birth', SOME_VALUE);
  });
  it('should build with date of birth with anchors', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withDateOfBirth(SOME_VALUE, [SOME_ANCHOR])
      .build();

    expect(tokenRequest).toContainAttribute('date_of_birth', SOME_VALUE, [SOME_ANCHOR]);
  });
  it('should build with gender', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withGender(SOME_VALUE)
      .build();

    expect(tokenRequest).toContainAttribute('gender', SOME_VALUE);
  });
  it('should build with gender with anchors', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withGender(SOME_VALUE, [SOME_ANCHOR])
      .build();

    expect(tokenRequest).toContainAttribute('gender', SOME_VALUE, [SOME_ANCHOR]);
  });
  it('should build with given names', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withGivenNames(SOME_VALUE)
      .build();

    expect(tokenRequest).toContainAttribute('given_names', SOME_VALUE);
  });
  it('should build with given names with anchors', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withGivenNames(SOME_VALUE, [SOME_ANCHOR])
      .build();

    expect(tokenRequest).toContainAttribute('given_names', SOME_VALUE, [SOME_ANCHOR]);
  });
  it('should build with nationality', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withNationality(SOME_VALUE)
      .build();

    expect(tokenRequest).toContainAttribute('nationality', SOME_VALUE);
  });
  it('should build with nationality with anchors', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withNationality(SOME_VALUE, [SOME_ANCHOR])
      .build();

    expect(tokenRequest).toContainAttribute('nationality', SOME_VALUE, [SOME_ANCHOR]);
  });
  it('should build with phone number', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withPhoneNumber(SOME_VALUE)
      .build();

    expect(tokenRequest).toContainAttribute('phone_number', SOME_VALUE);
  });
  it('should build with phone number with anchors', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withPhoneNumber(SOME_VALUE, [SOME_ANCHOR])
      .build();

    expect(tokenRequest).toContainAttribute('phone_number', SOME_VALUE, [SOME_ANCHOR]);
  });
  it('should build with postal address', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withPostalAddress(SOME_VALUE)
      .build();

    expect(tokenRequest).toContainAttribute('postal_address', SOME_VALUE);
  });
  it('should build with postal address with anchors', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withPostalAddress(SOME_VALUE, [SOME_ANCHOR])
      .build();

    expect(tokenRequest).toContainAttribute('postal_address', SOME_VALUE, [SOME_ANCHOR]);
  });
  it('should build with selfie', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withSelfie(SOME_VALUE)
      .build();

    expect(tokenRequest).toContainAttribute(
      'selfie',
      Buffer.from(SOME_VALUE).toString('base64')
    );
  });
  it('should build with selfie with anchors', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withSelfie(SOME_VALUE, [SOME_ANCHOR])
      .build();

    expect(tokenRequest).toContainAttribute(
      'selfie',
      Buffer.from(SOME_VALUE, [SOME_ANCHOR]).toString('base64'),
      [SOME_ANCHOR]
    );
  });
  it('should build with base64 encoded selfie', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withBase64Selfie(SOME_VALUE)
      .build();

    expect(tokenRequest).toContainAttribute('selfie', SOME_VALUE);
  });
  it('should build with structured postal address', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withStructuredPostalAddress(SOME_VALUE)
      .build();

    expect(tokenRequest).toContainAttribute('structured_postal_address', SOME_VALUE);
  });
  it('should build with structured postal address with anchors', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withStructuredPostalAddress(SOME_VALUE, [SOME_ANCHOR])
      .build();

    expect(tokenRequest).toContainAttribute('structured_postal_address', SOME_VALUE, [SOME_ANCHOR]);
  });
  it('should build with Document Details', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withDocumentDetails(SOME_VALUE)
      .build();

    const expectedData = {
      profile_attributes: [
        {
          name: 'document_details',
          value: SOME_VALUE,
          optional: true,
        },
      ],
    };

    expect(JSON.stringify(tokenRequest))
      .toBe(JSON.stringify(expectedData));
  });
  it('should build with Document Details with anchors', () => {
    const tokenRequest = new TokenRequestBuilder()
      .withDocumentDetails(SOME_VALUE, [SOME_ANCHOR])
      .build();

    const expectedData = {
      profile_attributes: [
        {
          name: 'document_details',
          value: SOME_VALUE,
          optional: true,
          anchors: [SOME_ANCHOR],
        },
      ],
    };

    expect(JSON.stringify(tokenRequest))
      .toBe(JSON.stringify(expectedData));
  });
  it('should build with age verification', () => {
    const ageVerification = new SandboxAgeVerificationBuilder()
      .withDateOfBirth(SOME_VALUE)
      .withAgeOver(18)
      .build();

    const tokenRequest = new TokenRequestBuilder()
      .withAgeVerification(ageVerification)
      .build();

    const expectedData = {
      profile_attributes: [
        {
          name: 'date_of_birth',
          value: SOME_VALUE,
          derivation: 'age_over:18',
        },
      ],
    };

    expect(JSON.stringify(tokenRequest))
      .toBe(JSON.stringify(expectedData));
  });
});

expect.extend({
  /**
   * @param {TokenRequest} receivedTokenRequest
   * @param {string} name
   * @param {string} value
   */
  toContainAttribute(receivedTokenRequest, name, value, anchors) {
    const expectedData = {
      profile_attributes: [
        {
          name,
          value,
          anchors,
        },
      ],
    };
    expect(JSON.stringify(receivedTokenRequest))
      .toBe(JSON.stringify(expectedData));

    return {
      message: () =>
        `TokenRequest contains '${name}' attribute with value '${value}'`,
      pass: true,
    };
  },
});
