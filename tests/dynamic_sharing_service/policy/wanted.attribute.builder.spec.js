const {
  expect,
} = require('chai');

const { WantedAttributeBuilder, SourceConstraintBuilder, ConstraintsBuilder } = require('../../../');
const WantedAttribute = require('../../../src/dynamic_sharing_service/policy/wanted.attribute');

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
      derivation: TEST_DERIVATION,
      optional: false,
    });

    expect(wantedAttribute).to.be.instanceOf(WantedAttribute);
    expect(JSON.stringify(wantedAttribute)).to.equal(expectedJson);
    expect(wantedAttribute.getName()).to.equal(TEST_NAME);
    expect(wantedAttribute.getDerivation()).to.equal(TEST_DERIVATION);
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
      derivation: '',
      optional: false,
      accept_self_asserted: true,
    });

    expect(wantedAttributeDefault).to.be.instanceOf(WantedAttribute);
    expect(wantedAttribute).to.be.instanceOf(WantedAttribute);
    expect(JSON.stringify(wantedAttributeDefault)).to.equal(expectedJson);
    expect(JSON.stringify(wantedAttribute)).to.equal(expectedJson);
  });

  it('should build a wanted attribute without accept self asserted', () => {
    const wantedAttribute = new WantedAttributeBuilder()
      .withName(TEST_NAME)
      .withAcceptSelfAsserted(false)
      .build();

    const expectedJson = JSON.stringify({
      name: TEST_NAME,
      derivation: '',
      optional: false,
      accept_self_asserted: false,
    });

    expect(wantedAttribute).to.be.instanceOf(WantedAttribute);
    expect(JSON.stringify(wantedAttribute)).to.equal(expectedJson);
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
      derivation: '',
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

    expect(wantedAttribute).to.be.instanceOf(WantedAttribute);
    expect(JSON.stringify(wantedAttribute)).to.equal(expectedJson);
  });
});
