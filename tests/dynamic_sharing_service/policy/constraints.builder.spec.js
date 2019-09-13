const { ConstraintsBuilder, SourceConstraintBuilder } = require('../../..');
const Constraints = require('../../../src/dynamic_sharing_service/policy/constraints');

describe('ConstraintsBuilder', () => {
  it('should build a constraint', () => {
    const sourceConstraint = new SourceConstraintBuilder()
      .withPassport()
      .build();

    const constraints = new ConstraintsBuilder()
      .withSourceConstraint(sourceConstraint)
      .build();

    expect(constraints).toBeInstanceOf(Constraints);

    const expectedJson = JSON.stringify([
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
    ]);

    expect(JSON.stringify(constraints)).toBe(expectedJson);
  });
});
