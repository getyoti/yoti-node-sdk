const {
  SandboxAgeVerificationBuilder,
  SandboxAnchorBuilder,
  YotiDate,
} = require('../../../../..');

const SOME_DATE_OF_BIRTH_STRING = '1989-01-02';
const SOME_DATE_OF_BIRTH = YotiDate.fromDateString(SOME_DATE_OF_BIRTH_STRING);
const SOME_AGE_VALUE = 18;
const SOME_AGE_OVER_DERIVATION_VALUE = `age_over:${SOME_AGE_VALUE}`;
const SOME_AGE_UNDER_DERIVATION_VALUE = `age_under:${SOME_AGE_VALUE}`;
const SOME_ANCHOR_TYPE = 'someAnchorType';
const SOME_ANCHOR_VALUE = 'someAnchorValue';

describe('SandboxAgeVerification', () => {
  it('should build age over attribute', () => {
    const sandboxAttribute = new SandboxAgeVerificationBuilder()
      .withDateOfBirth(SOME_DATE_OF_BIRTH)
      .withAgeOver(SOME_AGE_VALUE)
      .build()
      .toAttribute();

    const expectedData = {
      name: 'date_of_birth',
      value: SOME_DATE_OF_BIRTH_STRING,
      optional: false,
      derivation: SOME_AGE_OVER_DERIVATION_VALUE,
    };

    expect(JSON.stringify(sandboxAttribute))
      .toBe(JSON.stringify(expectedData));
  });
  it('should build age over attribute with date of birth string', () => {
    const sandboxAttribute = new SandboxAgeVerificationBuilder()
      .withDateOfBirthString(SOME_DATE_OF_BIRTH_STRING)
      .withAgeOver(SOME_AGE_VALUE)
      .build()
      .toAttribute();

    const expectedData = {
      name: 'date_of_birth',
      value: SOME_DATE_OF_BIRTH_STRING,
      optional: false,
      derivation: SOME_AGE_OVER_DERIVATION_VALUE,
    };

    expect(JSON.stringify(sandboxAttribute))
      .toBe(JSON.stringify(expectedData));
  });
  it('should build age under attribute', () => {
    const sandboxAttribute = new SandboxAgeVerificationBuilder()
      .withDateOfBirth(SOME_DATE_OF_BIRTH)
      .withAgeUnder(SOME_AGE_VALUE)
      .build()
      .toAttribute();

    const expectedData = {
      name: 'date_of_birth',
      value: SOME_DATE_OF_BIRTH_STRING,
      optional: false,
      derivation: SOME_AGE_UNDER_DERIVATION_VALUE,
    };

    expect(JSON.stringify(sandboxAttribute))
      .toBe(JSON.stringify(expectedData));
  });
  it('should build with anchors', () => {
    const sandboxAnchor = new SandboxAnchorBuilder()
      .withType(SOME_ANCHOR_TYPE)
      .withValue(SOME_ANCHOR_VALUE)
      .build();

    const sandboxAttribute = new SandboxAgeVerificationBuilder()
      .withDateOfBirth(SOME_DATE_OF_BIRTH)
      .withAgeOver(SOME_AGE_VALUE)
      .withAnchors([sandboxAnchor])
      .build()
      .toAttribute();

    const expectedData = {
      name: 'date_of_birth',
      value: SOME_DATE_OF_BIRTH_STRING,
      optional: false,
      derivation: SOME_AGE_OVER_DERIVATION_VALUE,
      anchors: [{
        type: SOME_ANCHOR_TYPE,
        value: SOME_ANCHOR_VALUE,
      }],
    };

    expect(JSON.stringify(sandboxAttribute))
      .toBe(JSON.stringify(expectedData));
  });
});
