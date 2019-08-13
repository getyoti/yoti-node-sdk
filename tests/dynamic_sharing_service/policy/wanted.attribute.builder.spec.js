const {
  expect,
} = require('chai');

const { WantedAttributeBuilder, SourceConstraintBuilder, ConstraintsBuilder } = require('../../../');
const WantedAttribute = require('../../../src/dynamic_sharing_service/policy/wanted.attribute');

const TEST_NAME = 'test_name';
const TEST_DERIVATION = 'test_derivation';

/**
 * Check the provided constraint serializes to JSON correctly.
 *
 * @param {WantedAttribute} wantedAttribute
 * @param {string} expectName
 * @param {string} expectDerivation
 * @param {Array} expectConstraints
 * @param {boolean} expectAcceptSelfAsserted
 */
const expectWantedAttributeJson = (
  wantedAttribute,
  expectName,
  expectDerivation,
  expectConstraints = [],
  expectAcceptSelfAsserted = true
) => {
  expect(wantedAttribute).to.be.instanceOf(WantedAttribute);

  const expectedJson = JSON.stringify({
    name: expectName,
    derivation: expectDerivation,
    optional: false,
    constraints: expectConstraints,
    accept_self_asserted: expectAcceptSelfAsserted,
  });

  expect(JSON.stringify(wantedAttribute)).to.equal(expectedJson);
};

describe('WantedAttributeBuilder', () => {
  it('should build a wanted attribute', () => {
    const wantedAttribute = new WantedAttributeBuilder()
      .withName(TEST_NAME)
      .withDerivation(TEST_DERIVATION)
      .build();

    expectWantedAttributeJson(wantedAttribute, TEST_NAME, TEST_DERIVATION);
    expect(wantedAttribute.getName()).to.equal(TEST_NAME);
    expect(wantedAttribute.getDerivation()).to.equal(TEST_DERIVATION);
  });

  it('should build a wanted attribute with accept self asserted', () => {
    const wantedAttribute = new WantedAttributeBuilder()
      .withName(TEST_NAME)
      .withAcceptSelfAsserted()
      .build();

    expectWantedAttributeJson(wantedAttribute, TEST_NAME, '', [], true);
  });

  it('should build a wanted attribute without accept self asserted', () => {
    const wantedAttribute = new WantedAttributeBuilder()
      .withName(TEST_NAME)
      .withAcceptSelfAsserted(false)
      .build();

    expectWantedAttributeJson(wantedAttribute, TEST_NAME, '', [], false);
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

    const expectConstraints = [
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
    ];
    expectWantedAttributeJson(wantedAttribute, TEST_NAME, '', expectConstraints, true);
  });
});
