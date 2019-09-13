const { SourceConstraintBuilder, WantedAnchorBuilder } = require('../../..');
const SourceConstraint = require('../../../src/dynamic_sharing_service/policy/source.constraint');

const ANCHOR_PASSPORT = 'PASSPORT';
const ANCHOR_DRIVING_LICENSE = 'DRIVING_LICENCE';
const ANCHOR_NATIONAL_ID = 'NATIONAL_ID';
const ANCHOR_PASSCARD = 'PASS_CARD';
const ANCHOR_SUB_TYPE_NATIONAL_ID = 'NATIONAL_ID_SUB_TYPE';
const ANCHOR_SUB_TYPE_PASSCARD = 'PASSCARD_SUB_TYPE';
const CONSTRAINT_TYPE_SOURCE = 'SOURCE';

const TEST_VALUE = 'test value';
const TEST_SUB_TYPE = 'test sub type';

/**
 * Check the provided constraint serializes to JSON correctly.
 *
 * @param {SourceConstraint} constraint
 * @param {string} expectValue
 * @param {string} expectSubType
 */
const expectSourceConstraintJson = (
  constraint,
  expectValue,
  expectSubType,
  expectSoftPreference = false
) => {
  expect(constraint).toBeInstanceOf(SourceConstraint);

  const expectedJson = JSON.stringify({
    type: CONSTRAINT_TYPE_SOURCE,
    preferred_sources: {
      anchors: [
        {
          name: expectValue,
          sub_type: expectSubType,
        },
      ],
      soft_preference: expectSoftPreference,
    },
  });

  expect(JSON.stringify(constraint)).toBe(expectedJson);
};

describe('SourceConstraintBuilder', () => {
  it('should build a passport constraint with sub type', () => {
    const sourceConstraint = new SourceConstraintBuilder()
      .withPassport(TEST_SUB_TYPE)
      .build();

    expectSourceConstraintJson(sourceConstraint, ANCHOR_PASSPORT, TEST_SUB_TYPE);
  });

  it('should build a passport constraint without sub type', () => {
    const sourceConstraint = new SourceConstraintBuilder()
      .withPassport()
      .build();

    expectSourceConstraintJson(sourceConstraint, ANCHOR_PASSPORT, '');
  });

  it('should build a National ID constraint with sub type', () => {
    const sourceConstraint = new SourceConstraintBuilder()
      .withNationalId(TEST_SUB_TYPE)
      .build();

    expectSourceConstraintJson(sourceConstraint, ANCHOR_NATIONAL_ID, TEST_SUB_TYPE);
  });

  it('should build a National ID constraint without sub type', () => {
    const sourceConstraint = new SourceConstraintBuilder()
      .withNationalId()
      .build();

    expectSourceConstraintJson(sourceConstraint, ANCHOR_NATIONAL_ID, '');
  });

  it('should build a Pass Card constraint with sub type', () => {
    const sourceConstraint = new SourceConstraintBuilder()
      .withPasscard(TEST_SUB_TYPE)
      .build();

    expectSourceConstraintJson(sourceConstraint, ANCHOR_PASSCARD, TEST_SUB_TYPE);
  });

  it('should build a Pass Card constraint without sub type', () => {
    const sourceConstraint = new SourceConstraintBuilder()
      .withPasscard()
      .build();

    expectSourceConstraintJson(sourceConstraint, ANCHOR_PASSCARD, '');
  });

  it('should build a Driving License constraint with sub type', () => {
    const sourceConstraint = new SourceConstraintBuilder()
      .withDrivingLicence(TEST_SUB_TYPE)
      .build();

    expectSourceConstraintJson(sourceConstraint, ANCHOR_DRIVING_LICENSE, TEST_SUB_TYPE);
  });

  it('should build a Driving License constraint without sub type', () => {
    const sourceConstraint = new SourceConstraintBuilder()
      .withDrivingLicence()
      .build();

    expectSourceConstraintJson(sourceConstraint, ANCHOR_DRIVING_LICENSE, '');
  });

  it('should build a constraint by value with sub type', () => {
    const sourceConstraint = new SourceConstraintBuilder()
      .withAnchorByValue(TEST_VALUE, TEST_SUB_TYPE)
      .build();

    expectSourceConstraintJson(sourceConstraint, TEST_VALUE, TEST_SUB_TYPE);
  });

  it('should build a constraint by value without sub type', () => {
    const sourceConstraint = new SourceConstraintBuilder()
      .withAnchorByValue(TEST_VALUE)
      .build();

    expectSourceConstraintJson(sourceConstraint, TEST_VALUE, '');
  });

  it('should build a constraint by wanted anchor with sub type', () => {
    const wantedAnchor = new WantedAnchorBuilder()
      .withValue(TEST_VALUE)
      .withSubType(TEST_SUB_TYPE)
      .build();

    const sourceConstraint = new SourceConstraintBuilder()
      .withAnchor(wantedAnchor)
      .build();

    expectSourceConstraintJson(sourceConstraint, TEST_VALUE, TEST_SUB_TYPE);
  });

  it('should build a constraint by wanted anchor without sub type', () => {
    const wantedAnchor = new WantedAnchorBuilder()
      .withValue(TEST_VALUE)
      .withSubType('')
      .build();

    const sourceConstraint = new SourceConstraintBuilder()
      .withAnchor(wantedAnchor)
      .build();

    expectSourceConstraintJson(sourceConstraint, TEST_VALUE, '');
  });

  it('should build a constraint with more than one anchor', () => {
    const sourceConstraint = new SourceConstraintBuilder()
      .withDrivingLicence()
      .withNationalId(ANCHOR_SUB_TYPE_NATIONAL_ID)
      .withPasscard(ANCHOR_SUB_TYPE_PASSCARD)
      .build();

    expect(sourceConstraint).toBeInstanceOf(SourceConstraint);

    const expectedJson = JSON.stringify({
      type: 'SOURCE',
      preferred_sources: {
        anchors: [
          {
            name: ANCHOR_DRIVING_LICENSE,
            sub_type: '',
          },
          {
            name: ANCHOR_NATIONAL_ID,
            sub_type: ANCHOR_SUB_TYPE_NATIONAL_ID,
          },
          {
            name: ANCHOR_PASSCARD,
            sub_type: ANCHOR_SUB_TYPE_PASSCARD,
          },
        ],
        soft_preference: false,
      },
    });

    expect(JSON.stringify(sourceConstraint)).toBe(expectedJson);
  });

  it('should build a constraint with soft preference', () => {
    const sourceConstraint = new SourceConstraintBuilder()
      .withDrivingLicence()
      .withSoftPreference()
      .build();

    expectSourceConstraintJson(sourceConstraint, ANCHOR_DRIVING_LICENSE, '', true);
  });

  it('should build a constraint without soft preference', () => {
    const sourceConstraint = new SourceConstraintBuilder()
      .withDrivingLicence()
      .withSoftPreference(false)
      .build();

    expectSourceConstraintJson(sourceConstraint, ANCHOR_DRIVING_LICENSE, '', false);
  });

  it('should build a constraint with soft preference set once', () => {
    const sourceConstraint = new SourceConstraintBuilder()
      .withDrivingLicence()
      .withSoftPreference(false)
      .withSoftPreference(true)
      .build();

    expectSourceConstraintJson(sourceConstraint, ANCHOR_DRIVING_LICENSE, '', true);
  });
});
