const { WantedAnchorBuilder } = require('../../..');
const WantedAnchor = require('../../../src/dynamic_sharing_service/policy/wanted.anchor');

const TEST_VALUE = 'TEST_VALUE';
const TEST_SUB_TYPE = 'TEST_SUB_TYPE';

describe('WantedAnchorBuilder', () => {
  it('should build a wanted anchor', () => {
    const wantedAnchor = new WantedAnchorBuilder()
      .withValue(TEST_VALUE)
      .withSubType(TEST_SUB_TYPE)
      .build();

    expect(wantedAnchor).toBeInstanceOf(WantedAnchor);

    const expectedJson = JSON.stringify({
      name: TEST_VALUE,
      sub_type: TEST_SUB_TYPE,
    });
    expect(JSON.stringify(wantedAnchor)).toBe(expectedJson);
  });
});
