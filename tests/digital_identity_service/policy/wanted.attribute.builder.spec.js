const {
  DigitalIdentityBuilders: {
    WantedAttributeBuilder, SourceConstraintBuilder, ConstraintsBuilder,
  },
} = require('../../..');
const WantedAttribute = require('../../../src/digital_identity_service/policy/wanted.attribute');

const TEST_NAME = 'test_name';
const TEST_DERIVATION = 'test_derivation';

describe('WantedAttributeBuilder', () => {
  it('should build a wanted attribute', () => {
    const wantedAttribute = new WantedAttributeBuilder()
      .withName(TEST_NAME)
      .withDerivation(TEST_DERIVATION)
      .build();

    const expectedJson = JSON.stringify({
      name: TEST_NAME,
      optional: false,
      derivation: TEST_DERIVATION,
    });

    expect(wantedAttribute).toBeInstanceOf(WantedAttribute);
    expect(JSON.stringify(wantedAttribute)).toBe(expectedJson);
    expect(wantedAttribute.getName()).toBe(TEST_NAME);
    expect(wantedAttribute.getDerivation()).toBe(TEST_DERIVATION);
  });

  it('should throw error when name is an empty string', () => {
    expect(() => {
      new WantedAttributeBuilder()
        .withName('')
        .build();
    }).toThrow(new TypeError('name cannot be null or empty'));
  });

  it('should throw error when name is a non-string value', () => {
    [null, []].forEach((nonStringValue) => {
      expect(() => {
        new WantedAttributeBuilder()
          .withName(nonStringValue)
          .build();
      }).toThrow(new TypeError('name must be a string'));
    });
  });

  it('should build a wanted attribute with accept self asserted', () => {
    const wantedAttributeDefault = new WantedAttributeBuilder()
      .withName(TEST_NAME)
      .withAcceptSelfAsserted()
      .build();

    const wantedAttribute = new WantedAttributeBuilder()
      .withName(TEST_NAME)
      .withAcceptSelfAsserted(true)
      .build();

    const expectedJson = JSON.stringify({
      name: TEST_NAME,
      optional: false,
      accept_self_asserted: true,
    });

    expect(wantedAttributeDefault).toBeInstanceOf(WantedAttribute);
    expect(wantedAttribute).toBeInstanceOf(WantedAttribute);
    expect(JSON.stringify(wantedAttributeDefault)).toBe(expectedJson);
    expect(JSON.stringify(wantedAttribute)).toBe(expectedJson);
  });

  it('should build a wanted attribute without accept self asserted', () => {
    const wantedAttribute = new WantedAttributeBuilder()
      .withName(TEST_NAME)
      .withAcceptSelfAsserted(false)
      .build();

    const expectedJson = JSON.stringify({
      name: TEST_NAME,
      optional: false,
      accept_self_asserted: false,
    });

    expect(wantedAttribute).toBeInstanceOf(WantedAttribute);
    expect(JSON.stringify(wantedAttribute)).toBe(expectedJson);
  });

  it('should throw error when provided derivation is not a string', () => {
    [false, [], 0, 1, {}].forEach((nonStringValue) => {
      expect(() => {
        new WantedAttributeBuilder()
          .withName(TEST_NAME)
          .withDerivation(nonStringValue)
          .build();
      }).toThrow(new TypeError('derivation must be a string'));
    });
  });

  it('should build a wanted attribute with constraints', () => {
    const sourceConstraint = new SourceConstraintBuilder()
      .withPassport()
      .build();

    const constraints = new ConstraintsBuilder()
      .withSourceConstraint(sourceConstraint)
      .build();

    const wantedAttribute = new WantedAttributeBuilder()
      .withName(TEST_NAME)
      .withConstraints(constraints)
      .build();

    const expectedJson = JSON.stringify({
      name: TEST_NAME,
      optional: false,
      constraints: [
        {
          type: 'SOURCE',
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
    });

    expect(wantedAttribute).toBeInstanceOf(WantedAttribute);
    expect(JSON.stringify(wantedAttribute)).toBe(expectedJson);
  });

  it('should build a wanted attribute with alternative name', () => {
    const wantedAttribute = new WantedAttributeBuilder()
      .withName(TEST_NAME)
      .withAlternativeName(`alt-${TEST_NAME}`)
      .build();

    const expectedJson = JSON.stringify({
      name: TEST_NAME,
      optional: false,
      alternative_names: [`alt-${TEST_NAME}`],
    });
    expect(wantedAttribute).toBeInstanceOf(WantedAttribute);
    expect(JSON.stringify(wantedAttribute)).toBe(expectedJson);
  });

  it('should build a wanted attribute with alternative names', () => {
    const wantedAttribute = new WantedAttributeBuilder()
      .withName(TEST_NAME)
      .withAlternativeNames([`${TEST_NAME}-alt1`, `${TEST_NAME}-alt2`])
      .build();

    const expectedJson = JSON.stringify({
      name: TEST_NAME,
      optional: false,
      alternative_names: [`${TEST_NAME}-alt1`, `${TEST_NAME}-alt2`],
    });
    expect(wantedAttribute).toBeInstanceOf(WantedAttribute);
    expect(JSON.stringify(wantedAttribute)).toBe(expectedJson);
  });

  it('should build a wanted attribute with alternative names using both methods', () => {
    const wantedAttribute = new WantedAttributeBuilder()
      .withName(TEST_NAME)
      .withAlternativeNames([`${TEST_NAME}-alt1`, `${TEST_NAME}-alt2`])
      .withAlternativeName(`${TEST_NAME}-extra`)
      .build();

    const expectedJson = JSON.stringify({
      name: TEST_NAME,
      optional: false,
      alternative_names: [`${TEST_NAME}-alt1`, `${TEST_NAME}-alt2`, `${TEST_NAME}-extra`],
    });
    expect(wantedAttribute).toBeInstanceOf(WantedAttribute);
    expect(JSON.stringify(wantedAttribute)).toBe(expectedJson);
  });

  it('should build a wanted attribute with optional behaviour', () => {
    const wantedAttribute = new WantedAttributeBuilder()
      .withName(TEST_NAME)
      .withOptional(true)
      .build();

    const expectedJson = JSON.stringify({
      name: TEST_NAME,
      optional: true,
    });
    expect(wantedAttribute).toBeInstanceOf(WantedAttribute);
    expect(JSON.stringify(wantedAttribute)).toBe(expectedJson);
  });
});
